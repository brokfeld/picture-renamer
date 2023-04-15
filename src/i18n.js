import config from "../config.js";

const lang = {};

lang[`development-mode-is-enabled`] = {
  'default': `Development mode is enabled!`,
  'de-DE': `Entwicklermodus ist aktiviert!`
};

lang[`selected-picture-directory`] = {
  'default': `Selected picture directory:`,
  'de-DE': `Gewähltes Fotoverzeichnis:`
};

lang[`suffix-question`] = {
  'default': `Define suffix or leave blank. Continue with Enter.`,
  'de-DE': `Suffix definieren oder leer lassen. Weiter mit Enter.`
};

lang[`suffix-error`] = {
  'default': `Error: A maximum of 20 characters are allowed!`,
  'de-DE': `Fehler: Es sind maximal 20 Zeichen erlaubt!`
};

/**
 * 
 * @param {string} id 
 * @returns {string}
 */
export default function i18n(id) {
  if (lang[id]) {
    if (lang[id][config.locale]) {
      return lang[id][config.locale];
    } else {
      return lang[id].default;
    }
  }
}