#!/usr/bin/env node

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

async function exists(fileOrDir) {
  try {
    await fs.access(fileOrDir);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }

}

(async () => {
  const platform = os.platform();

  if (platform === `linux`) {
    // Linux

    // file manager nemo is installed
    if (await exists(`/bin/nemo`)) {
      if (process.env.USER) {
        const nemoActionsDir = path.resolve(`/home/${process.env.USER}/.local/share/nemo/actions`);
        await fs.mkdir(nemoActionsDir, { recursive: true });

        const nemoActionFile = path.resolve(nemoActionsDir, `picture_renamer.nemo_action`);
        const nemoActionFileContent = `
[Nemo Action]
Name=Rename pictures
Comment=Renames all pictures of a directory
Name[de]=Fotos umbenennen
Comment[de]=Benennt alle Fotos aus einem Ordner um
Exec=/home/${process.env.USER}/.npm-global/bin/picture-renamer --dir %F
Icon-Name=folder-pictures
Selection=any
Extensions=jpg;jpeg;dir;
Quote=double
Terminal=true
`;
        await fs.writeFile(nemoActionFile, nemoActionFileContent, { encoding: `utf8` });
        console.log(nemoActionsDir);
      }
    }

  } else {
    if (platform === `win32`) {
      // Windows

    }
  }

})();

