const languages = {
  'en': require('../../lang/en.json'),
  'en.redacted': require('../../lang/en.redacted.json'),
  'none': {},
};

let language = 'en.redacted';

export function setLanguage(newLang) {
  language = newLang;
}
export function lang(str, ...args) {
  return languages[language][str] || `\${${str}${args.length > 0 ? ', ' : ''}${args.join(', ')}}`;
}
