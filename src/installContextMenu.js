import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import exists from './exists.js';
import child_process from 'node:child_process';
import util from 'node:util';
import i18n from './i18n.js';

const exec = util.promisify(child_process.exec);

export default async function installContextMenu(){

  const platform = os.platform();

  if (platform === `linux`) {
    // Linux

    // create nemo action file
    if (await exists(`/bin/nemo`)) {
      if (process.env.USER) {
        const nemoActionsDir = path.resolve(`/home/${process.env.USER}/.local/share/nemo/actions`);
        await fs.mkdir(nemoActionsDir, { recursive: true });
        
        // https://github.com/linuxmint/nemo/blob/master/files/usr/share/nemo/actions/sample.nemo_action
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
      await exec(`REG ADD HKEY_CURRENT_USER\\Software\\Classes\\directory\\Background\\shell\\picture-renamer /d "${i18n('windows-context-menu-rename-pictures')}" /f`);
      await exec(`REG ADD HKEY_CURRENT_USER\\Software\\Classes\\directory\\Background\\shell\\picture-renamer\\command /d "\"C:\\Users\\%USERNAME%\\AppData\\Roaming\\npm\\picture-renamer.cmd\" --dir \"%V\"" /f`);
    }
  }
  
}