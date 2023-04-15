# picture-renamer

## Installation

* **Requirements**:
  * Installation of [Node.js/npm](https://nodejs.org/)
  * Installation of [Git](https://git-scm.com/)

```bash
## Linux Mint
sudo -i
npm i git+https://github.com/brokfeld/picture-renamer.git#main -g
exit
wget https://raw.githubusercontent.com/brokfeld/picture-renamer/main/src/context_menu/picture_renamer.nemo_action -o ~/.local/share/nemo/actions/picture_renamer.nemo_action
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
