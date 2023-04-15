# picture-renamer

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
```

```bash
## 02 Install picture-renamer
npm i git+https://github.com/brokfeld/picture-renamer.git#main -g

## 03 Install context menu extension
cp ~/.npm-global/lib/node_modules/@brokfeld/picture-renamer/src/context_menu/picture_renamer.nemo_action ~/.local/share/nemo/actions/picture_renamer.nemo_action
```

## Uninstall

### Linux Mint

```bash
## 01 Remove picture renamer
npm remove @brokfeld/picture-renamer -g

## 02 Remove context menu extension
rm ~/.local/share/nemo/actions/picture_renamer.nemo_action
```

## Development

```bash
git clone https://github.com/brokfeld/picture-renamer.git
cd picture-renamer
npm i
npm run cli
```

## Changelog

### v1.0.0

* Rename all `.jpg` / `.jpeg` files of a directory to `YYYYMMDD_hhmmss_n_suffix.jpg` (15.04.2023)

## License

[MIT](LICENSE)
