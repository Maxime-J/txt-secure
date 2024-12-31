import { BaseLexer } from 'i18next-parser';

class StringsLexer extends BaseLexer {
  constructor() {
    super();
    this.regex = /{strings\.([\w.]*)}/g;
  }
  
  extract(content) {
    const test = content.matchAll(this.regex);
    for(const match of test){
      this.keys.push({
        key: match[1],
      });
    }
    return this.keys;
  }
}

export default {
  locales: ['fr'],
  output: 'locale/$LOCALE.json',
  sort: true,
  lexers: {
    jsx: [StringsLexer],
  },
};
