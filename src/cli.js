#!/usr/bin/env node

import 'colors';
import path from 'node:path';
import prompts from 'prompts';
import fs from 'node:fs/promises';
import config from '../config.js';
import i18n from './i18n.js';
import getCaptureDate from './getCaptureDate.js';
import installContextMenu from './installContextMenu.js';
import removeContextMenu from './removeContextMenu.js';

(async () => {

  if (config.installContextMenu) {
    await installContextMenu();
  } else {

    if (config.removeContextMenu) {
      await removeContextMenu();
    } else {


      console.log(config.hr.cyan);
      console.log(`## picture-renamer v${config.package.version}`.cyan);
      console.log(config.hr.cyan);

      if (config.isDevMode) {
        console.log(config.hr2);
        console.log(i18n(`development-mode-is-enabled`).bold.yellow);
        console.log(config.hr2);
      }

      console.log(i18n(`selected-picture-directory`).bold.yellow);
      console.log(config.pictureDir.green);
      console.log(config.hr2);

      // ask for suffix
      let suffix = (await prompts({
        type: 'text',
        name: 'value',
        message: i18n(`suffix-question`).yellow,
        validate: value => value.length > 20 ? i18n(`suffix-error`) : true
      })).value;
      if (suffix) {
        suffix = `_${suffix}`;
      }

      console.log(config.hr2);

      // ask for hour addition
      let hourAddition = (await prompts({
        type: 'number',
        name: 'value',
        initial: 0,
        message: i18n(`hour-question`).yellow,
      })).value;
      if (!hourAddition) {
        hourAddition = 0;
      }

      // ask for minutes addition
      let minutesAddition = (await prompts({
        type: 'number',
        name: 'value',
        initial: 0,
        message: i18n(`minutes-question`).yellow,
      })).value;
      if (!minutesAddition) {
        minutesAddition = 0;
      }

      console.log(config.hr2);

      // items of directory
      const items = await fs.readdir(config.pictureDir, { withFileTypes: true });

      const files = [];

      const sameDate = {};
      let maxSrcLength = 5;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.isFile()) {
          const nameLow = item.name.toLowerCase();
          if (nameLow.endsWith(`.jpg`) || nameLow.endsWith(`.jpeg`) || nameLow.endsWith(`.mp4`)) {
            const file = {};

            // target file extension
            let ext = `jpg`;
            if(item.name.toLowerCase().endsWith(`.mp4`)){
              ext = `mp4`;
            }

            file.srcName = item.name;
        
            if (file.srcName.length > maxSrcLength) {
              maxSrcLength = file.srcName.length;
            }

            file.src = path.resolve(config.pictureDir, item.name);
            file.date = await getCaptureDate(file.src, { addHours: hourAddition, addMinutes: minutesAddition });

            if (sameDate[file.date] >= 0) {
              sameDate[file.date]++;
            } else {
              sameDate[file.date] = 0;
            }

            file.dateCounter = sameDate[file.date];

            file.destName = `${file.date}_${file.dateCounter}${suffix}.${ext}`;

            file.dest = path.resolve(config.pictureDir, file.destName);

            files.push(file);
          }
        }
      }

      console.log(i18n(`preview`).bold.yellow);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`${file.srcName.padEnd(maxSrcLength, ` `).cyan} → ${file.destName.green}`);
      }
      console.log(config.hr2);

      let ok = (await prompts({
        type: `toggle`,
        name: `value`,
        message: i18n(`start-renaming-question`).yellow,
        initial: false,
        active: i18n(`yes`),
        inactive: i18n(`no`)
      })).value;

      console.log(config.hr2);

      if (ok) {
        for (let j = 0; j < files.length; j++) {
          const file = files[j];
          console.log(`${file.srcName.padEnd(maxSrcLength, ` `).magenta} → ${file.destName.green}`);
          await fs.rename(file.src, file.dest);
        }
      }
    }
  }
})();
