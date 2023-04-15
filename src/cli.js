#!/usr/bin/env node

import path from 'node:path';

/**
 * Determines the directory path
 * @returns {string}
 */
function determineDir() {
  let dir = process.cwd();
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg === `--dir`) {
      const dirArg = process.argv[i + 1];
      if (dirArg) {
        const item = path.resolve(dirArg);
        const itemParsed = path.parse(item);
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

const dir = determineDir();
console.log(`Rename all pictures of ${dir}`, process.argv);


setTimeout(() => {
  console.log(`end`);
}, 60000)