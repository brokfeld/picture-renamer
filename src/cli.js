#!/usr/bin/env node

import 'colors';
import path from 'node:path';
import prompts from 'prompts';
import fs from 'node:fs/promises';
import config from '../config.js';
import i18n from './i18n.js';
import getCaptureDate from './getCaptureDate.js';

(async () => {

  console.log(config.hr.cyan);
  console.log(`## picture-renamer v${config.package.version}`.cyan);
  console.log(config.hr.cyan);

  if (config.isDevMode) {
    console.log(config.hr2);
    console.log(i18n(`development-mode-is-enabled`).yellow);
    console.log(config.hr2);
  }

  console.log(i18n(`selected-picture-directory`).bold);
  console.log(config.pictureDir.green);
  console.log(config.hr2);

  // ask for suffix
  let suffix = (await prompts({
    type: 'text',
    name: 'value',
    message: i18n(`suffix-question`),
    validate: value => value.length > 20 ? i18n(`suffix-error`) : true
  })).value;
  if (suffix) {
    suffix = `_${suffix}`;
  }

  // items of directory
  const items = await fs.readdir(config.pictureDir, { withFileTypes: true });

  const files = [];

  const sameDate = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.isFile()) {
      const nameLow = item.name.toLowerCase();
      if (nameLow.endsWith(`.jpg`) || nameLow.endsWith(`.jpeg`)) {
        const file = {};

        file.srcName = item.name;
        file.src = path.resolve(config.pictureDir, item.name);
        file.date = await getCaptureDate(file.src);


        if (sameDate[file.date] >= 0) {
          sameDate[file.date]++;
        } else {
          sameDate[file.date] = 0;
        }

        file.dateCounter = sameDate[file.date];

        file.destName = `${file.date}_${file.dateCounter}${suffix}.jpg`;

        file.dest = path.resolve(config.pictureDir, file.destName);

        files.push(file);
      }
    }
  }

  console.log(files)
})();
