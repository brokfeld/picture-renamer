import config from "../config.js";

const lang = {};

lang[`development-mode-is-enabled`] = {
  'default': `Development mode is enabled!`,
  'de-DE': `Entwicklermodus ist aktiviert!`
};

lang[`selected-picture-directory`] = {
  'default': `Selected picture directory`,
  'de-DE': `Gewähltes Fotoverzeichnis`
};

lang[`suffix-question`] = {
  'default': `Define suffix or leave blank. Continue with Enter.`,
  'de-DE': `Suffix definieren oder leer lassen. Weiter mit Enter.`
};

lang[`suffix-error`] = {
  'default': `Error: A maximum of 20 characters are allowed!`,
  'de-DE': `Fehler: Es sind maximal 20 Zeichen erlaubt!`
};

lang[`hour-question`] = {
  'default': `Add or subtract hours (default is 0). Continue with Enter.`,
  'de-DE': `Stunden hinzufügen bzw. abziehen (Standard ist 0). Weiter mit Enter.`
};

lang[`minutes-question`] = {
  'default': `Add or subtract minutes (default is 0). Continue with Enter.`,
  'de-DE': `Minuten hinzufügen bzw. abziehen (Standard ist 0). Weiter mit Enter.`
};

lang[`preview`] = {
  'default': `Preview`,
  'de-DE': `Vorschau`
};

lang[`start-renaming-question`] = {
  'default': `Start renaming?`,
  'de-DE': `Starte das Umbenennen?`
};

lang[`yes`] = {
  'default': `Yes`,
  'de-DE': `Ja`
};

lang[`no`] = {
  'default': `No`,
  'de-DE': `Nein`
};

lang[`windows-context-menu-rename-pictures`] = {
  'default': `Rename pictures`,
  'de-DE': `Fotos umbenennen`
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