import { BaseLexer } from 'i18next-parser';

class StringsLexer extends BaseLexer {
  constructor() {
    super();
    this.regex = /strings\.([\w.]*)(?:\[.*\])*/g;
  }

  extract(content) {
    for (const match of content.matchAll(this.regex)) {
      if (!match[0].includes('[')) {
        this.keys.push({ key: match[1] });
      }
    }
    return this.keys;
  }
}

export default {
  locales: ['fr'],
  output: 'locale/$LOCALE.json',
  sort: true,
  lexers: {
    tsx: [StringsLexer],
  },
};
