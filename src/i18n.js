import config from "../config.js";

const lang = {};

lang[`development-mode-is-enabled`] = {
  'default': `Development mode is enabled!`,
  'de-DE': `Entwicklermodus ist aktiviert!`
}

lang[`suffix-question`] = {
  'default': `Define suffix or leave blank. Continue with Enter.`,
  'de-DE': `Suffix definieren oder leer lassen. Weiter mit Enter.`
}

export default function i18n(id) {
  if (lang[id]) {
    if (lang[id][config.locale]) {
      return lang[id][config.locale];
    } else {
      return lang[id].default;
    }
  }
}