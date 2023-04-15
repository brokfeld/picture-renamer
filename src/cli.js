#!/usr/bin/env node

import path from 'node:path';
import prompts from 'prompts';
import fs from 'node:fs/promises';
import config from '../config.js';
import i18n from './i18n.js';

(async () => {

  console.log(config.hr);
  console.log(`## picture-renamer v${config.package.version}`);
  console.log(config.hr);

  if (config.isDevMode) {
    console.log(i18n(`development-mode-is-enabled`));
  }

  // ask for suffix
  let suffix = (await prompts({
    type: 'text',
    name: 'value',
    message: i18n(`suffix-question`),
    validate: value => value.length > 20 ? `Error: A maximum of 20 characters are allowed!` : true
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

        //        const exifDate = (await ExifReader.load(file.src, { expanded: true })).exif.DateTime.value[0].replace(` `, `:`).split(`:`);
        //        file.date = {};
        //        file.date.YYYY = exifDate[0];
        //        file.date.MM = exifDate[1];
        //        file.date.DD = exifDate[2];
        //        file.date.hh = exifDate[3];
        //        file.date.mm = exifDate[4];
        //        file.date.ss = exifDate[5];
        //        file.date.full = `${file.date.YYYY}${file.date.MM}${file.date.DD}_${file.date.hh}${file.date.mm}${file.date.ss}`;
        //
        //        if (sameDate[file.date.full]) {
        //          sameDate[file.date.full]++;
        //        } else {
        //          sameDate[file.date.full] = 0;
        //        }
        //
        //        file.date.counter = sameDate[file.date.full];
        //
        //
        //        file.destName = `${file.date.full}_${file.date.counter}${suffix}.jpg`;
        //
        //        file.dest = path.resolve(dir, file.destName);

        files.push(file);
      }
    }
  }

  console.log(files)
})();
