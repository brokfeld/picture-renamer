import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const config = {};

/**
 * Says if the development mode is enabled
 * @type {boolean}
 */
config.isDevMode = false;
for (let i = 0; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === `--dev`) {
    config.isDevMode = true;
    break;
  }
}

config.locale = Intl.DateTimeFormat().resolvedOptions().locale;

/**
 * Root directory
 * @type {string}
 */
config.rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Examples directory
 */
config.examplesDir = path.resolve(config.rootDir, `examples`);

/**
 * Examples development directory
 */
config.examplesDevDir = path.resolve(config.rootDir, `examples-dev`);


/**
 * Directory of pictures
 */
config.pictureDir = process.cwd();
if(config.isDevMode){
  config.pictureDir = config.examplesDevDir;
}
for (let i = 0; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === `--dir`) {
    const dirArg = process.argv[i + 1];
    if (dirArg) {
      const item = path.resolve(dirArg);
      const stats = fs.statSync(item);
      if (stats.isDirectory()) {
        dir = item;
      } else {
        if (stats.isFile()) {
          dir = path.parse(item).dir;
        }
      }
      break;
    }
  }
}

config.hr = `####################################################################`;

config.package = JSON.parse(fs.readFileSync(path.resolve(config.rootDir,`package.json`),{encoding: `utf8`}));

// -------------------------------------------------------------------------------------------------------------------

/**
 * Create example files for the development mode
 */
if (config.isDevMode) {
  // Remove example development directory
  if (fs.existsSync(config.examplesDevDir)) {
    fs.rmSync(config.examplesDevDir, { recursive: true });
  }

  // Create example development directory
  fs.mkdirSync(config.examplesDevDir, { recursive: true });

  // Determine example files
  const exampleFiles = fs.readdirSync(config.examplesDir, { withFileTypes: true }).filter((item) => {
    let result = false;
    if (item.isFile) {
      const filenameLow = item.name.toLowerCase();
      if (filenameLow.endsWith(`.jpg`) || filenameLow.endsWith(`.jpeg`)) {
        result = true;
      }
    }
    return result;
  }).map(item => item.name);

  // Copy examples files to example development directory
  for (let i = 0; i < exampleFiles.length; i++) {
    const file = exampleFiles[i];
    fs.copyFileSync(path.resolve(config.examplesDir, file), path.resolve(config.examplesDevDir, file));
  }
}

console.log(config);

export default config;