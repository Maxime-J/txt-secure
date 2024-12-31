import { base58 } from '@scure/base';
import { zlibSync, unzlibSync } from 'fflate';
const { crypto } = globalThis;

const base64 = {
  encode: (bytesArray) => btoa(String.fromCharCode.apply(null, bytesArray)),
  decode: (string64) => Uint8Array.from(atob(string64), (c) => c.charCodeAt(0)),
};

const textEncode = (function () {
  let encoder;
  return (string) => {
    if (!encoder) encoder = new TextEncoder();
    return encoder.encode(string);
  };
})();

const textDecode = (function () {
  let decoder;
  return (bytesArray) => {
    if (!decoder) decoder = new TextDecoder();
    return decoder.decode(bytesArray);
  };
})();

const getRandomBytes = (length) => crypto.getRandomValues(new Uint8Array(length));

function Crypto({ key58, vector64, salt64 } = {}) {
  const key = (key58) ? base58.decode(key58) : getRandomBytes(32);
  const vector = (vector64) ? base64.decode(vector64) : getRandomBytes(16);
  const salt = (salt64) ? base64.decode(salt64) : getRandomBytes(8);

  const getAesKey = async (password) => {
    let importedKey;

    if (password) {
      const passwordArray = textEncode(password);
      importedKey = new Uint8Array(key.length + passwordArray.length);
      importedKey.set(key);
      importedKey.set(passwordArray, key.length);
    } else {
      importedKey = key;
    }

    const baseKey = await crypto.subtle.importKey(
      'raw',
      importedKey,
      'PBKDF2',
      false,
      ['deriveKey'],
    );

    const aesKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    );

    return aesKey;
  };

  const encrypt = async (text, password) => {
    const textArray = textEncode(text);
    const aesKey = await getAesKey(password);
    const encrypted = await crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv: vector,
    }, aesKey, zlibSync(textArray));
    return base64.encode(new Uint8Array(encrypted));
  }

  const decrypt = async (text, password) => {
    const aesKey = await getAesKey(password);
    const decrypted = await crypto.subtle.decrypt({
      name: 'AES-GCM',
      iv: vector,
    }, aesKey, base64.decode(text));
    const textArray = unzlibSync(new Uint8Array(decrypted));
    return textDecode(textArray);
  };

  return {
    encrypt,
    decrypt,
    get params() {
      return {
        key58: base58.encode(key),
        vector64: base64.encode(vector),
        salt64: base64.encode(salt),
      };
    },
  };
}

export default Crypto;
