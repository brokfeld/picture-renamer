# Picture Renamer

## Install

* **Requirements**:
  * Installation of [Node.js/npm](https://nodejs.org/)
  * Installation of [Git](https://git-scm.com/)

### Linux Mint

```bash
## 01 Resolving EACCES permissions errors when installing packages globally
# https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

## 02 Install Picture Renamer
npm i git+https://github.com/brokfeld/picture-renamer.git#main -g

## 03 Install context menu entry
picture-renamer install-context-menu
```

## Uninstall

### Linux Mint

```bash
## 01 Remove context menu entry
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

## Starts program in development mode
# a) Picture directory is ./examples-dev
npm run dev
# b) Use a custom picture directory
npm run dev -- --dir "./custom-picture-dir"

## Starts program in production mode
# a) Picture directory is . (cwd)
npm start
# b) Use a custom picture directory
npm start -- --dir "./custom-picture-dir"
```

## Changelog

### v1.0.0

* Capture date detection from filename, if exif not available (17.04.2023)
* Installer for a context menu entry (16.04.2023)
* Rename all `.jpg` / `.jpeg` files of a directory to `YYYYMMDD_hhmmss_n_suffix.jpg` (15.04.2023)

## License

[MIT](LICENSE)
