import { BaseLexer } from 'i18next-parser';

class LocaleLexer extends BaseLexer {
  constructor() {
    super();
    this.regex = /((?:pages|strings)\.[\w.]*)(?:\[.*\]|>)*/g;
    this.ignore = /[[|>]/;
  }

  extract(content) {
    for (const match of content.matchAll(this.regex)) {
      if (!this.ignore.test(match[0])) {
        this.keys.push({ key: match[1] });
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
    ts: [LocaleLexer],
    tsx: [LocaleLexer],
  },
};
