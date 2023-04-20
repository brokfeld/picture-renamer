import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import exists from './exists.js';
import child_process from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(child_process.exec);
export default async function removeContextMenu() {
  const platform = os.platform();

  if (platform === `linux`) {
    // Linux
    if (process.env.USER) {

      // Remove nemo action file
      const nemoActionFile = path.resolve(`/home/${process.env.USER}/.local/share/nemo/actions/picture_renamer.nemo_action`);
      if (await exists(nemoActionFile)) {
        await fs.rm(nemoActionFile);
      }

    }
  } else {
    if (platform === `win32`) {
      // Windows
      await exec(`REG DELETE HKEY_CURRENT_USER\\Software\\Classes\\directory\\Background\\shell\\picture-renamer /f`);
    }
  }

}
