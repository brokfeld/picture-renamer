# Picture Renamer

## Install

* **Requirements**:
  * Installation of [Node.js/npm](https://nodejs.org/)
  * Installation of [Git](https://git-scm.com/)

```bash
## 00 Resolving EACCES permissions errors when installing packages globally (only on Linux Mint)
# https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

```bash
## 01 Install Picture Renamer
npm i git+https://github.com/brokfeld/picture-renamer.git#main -g

## 02 Install context menu entry (only Windows and Linux Mint)
picture-renamer install-context-menu
```

## Uninstall

```bash
## 01 Remove context menu entry (only Windows and Linux Mint)
picture-renamer remove-context-menu

## 02 Remove Picture Renamer
npm remove @brokfeld/picture-renamer -g
```

## Development

```bash
## Clone git repository
git clone https://github.com/brokfeld/picture-renamer.git
cd picture-renamer

## Install dependencies
npm i

#----------------------------------------------------------

## Starts program in development mode
# a) Picture directory is ./examples-dev
npm run dev
# b) Use a custom picture directory
npm run dev -- --dir "./custom-picture-dir"

## Install context menu entry in development mode
npm run dev -- install-context-menu

## Remove context menu entry in development mode
npm run dev -- remove-context-menu

#----------------------------------------------------------

## Starts program in production mode
# a) Picture directory is . (cwd)
npm start
# b) Use a custom picture directory
npm start -- --dir "./custom-picture-dir"

## Install context menu entry in production mode
npm start -- install-context-menu

## Remove context menu entry in production mode
npm start -- remove-context-menu
```

## Changelog

### v1.1.0

* Add or subtract hours (2023-07-22)

### v1.0.0

* Installer/Uninstaller for a context menu entry on Windows (2023-04-20)
* Capture date detection from filename, if exif not available (2023-04-17)
* Installer/Uninstaller for a context menu entry on Linux Mint (2023-04-16)
* Renaming all `.jpg` / `.jpeg` files of a directory to `YYYYMMDD_hhmmss_n_suffix.jpg` (2023-04-15)

## License

[MIT](LICENSE)
