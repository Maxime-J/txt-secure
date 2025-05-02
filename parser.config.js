import { BaseLexer } from 'i18next-parser';

class StringsLexer extends BaseLexer {
  constructor() {
    super();
    this.regex = /((?:strings|pages)\.)([\w.]*)(?:\[.*\])*/g;
  }

  extract(content) {
    for (const match of content.matchAll(this.regex)) {
      console.log(match[0]);
      if (!match[0].includes('[')) {
        this.keys.push({ key: match[1] + match[2] });
      }
    }
    return this.keys;
  }
}

export default {
  locales: ['fr'],
  output: 'src/locale.json',
  sort: true,
  lexers: {
    tsx: [StringsLexer],
    ts: [StringsLexer],
  },
};
