#!/usr/bin/env node

import path from 'node:path';
import prompts from 'prompts';
import fs from 'node:fs/promises';

/**
 * Determines the directory path
 * @returns {string}
 */
async function determineDir() {
  let dir = process.cwd();
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === `--dir`) {
      const dirArg = process.argv[i + 1];
      if (dirArg) {
        const item = path.resolve(dirArg);
        const itemParsed = path.parse(item);

        // TODO: checks isDir, isFile with node:fs
        if (itemParsed.ext) {
          dir = itemParsed.dir;
        } else {
          dir = item;
        }
        
        break;
      }
    }
  }
  return dir;
}



(async () => {

  const dir = await determineDir();

console.log(dir);


  // ask for suffix
  let suffix = (await prompts({
    type: 'text',
    name: 'value',
    message: 'Suffix?',
    validate: value => value.length > 20 ? `Error: A maximum of 20 characters are allowed!` : true
  })).value;
  if (suffix) {
    suffix = `_${suffix}`;
  }

  // items of directory
  const items = await fs.readdir(dir, { withFileTypes: true });

  const files = [];

  const sameDate = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.isFile()) {
      const nameLow = item.name.toLowerCase();
      if (nameLow.endsWith(`.jpg`) || nameLow.endsWith(`.jpeg`)) {
        const file = {};

        file.srcName = item.name;
        file.src = path.resolve(dir, item.name);

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
