import { base58 } from '@scure/base';
import { unzlibSync, zlibSync } from 'fflate';
const { crypto } = globalThis;

const base64 = {
  encode: (bytesArray: Uint8Array) => {
    const str = Array.from(bytesArray, (byte) => String.fromCharCode(byte)).join('');
    return btoa(str);
  },
  decode: (string64: string) => Uint8Array.from(atob(string64), (c) => c.charCodeAt(0)),
};

const textEncode = (function () {
  let encoder: TextEncoder;
  return (str: string) => {
    if (!encoder) encoder = new TextEncoder();
    return encoder.encode(str);
  };
})();

const textDecode = (function () {
  let decoder: TextDecoder;
  return (bytesArray: Uint8Array) => {
    if (!decoder) decoder = new TextDecoder();
    return decoder.decode(bytesArray);
  };
})();

const getRandomBytes = (length: number) => crypto.getRandomValues(new Uint8Array(length));

interface CryptoParams {
  key58: string,
  vector64: string,
  salt64?: string,
}

function Crypto({ key58, vector64, salt64 }: CryptoParams = <CryptoParams>{}) {
  const key = (key58) ? base58.decode(key58) as Uint8Array<ArrayBuffer> : getRandomBytes(32);
  const vector = (vector64) ? base64.decode(vector64) : getRandomBytes(12);
  const salt = (salt64) ? base64.decode(salt64) : getRandomBytes(16);

  const getAesKey = async (password: string) => {
    let rawKey;

    if (password) {
      const passKey = await crypto.subtle.importKey(
        'raw',
        textEncode(password),
        'PBKDF2',
        false,
        ['deriveBits'],
      );

      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        passKey,
        256
      );

      const mergedBytes = new Uint8Array(key.length + derivedBits.byteLength);
      mergedBytes.set(key);
      mergedBytes.set(new Uint8Array(derivedBits), key.length);

      const masterKey = await crypto.subtle.importKey(
        'raw',
        mergedBytes,
        'HKDF',
        false,
        ['deriveBits']
      );

      rawKey = await crypto.subtle.deriveBits(
        {
          name: 'HKDF',
          salt,
          hash: 'SHA-256',
          info: textEncode('password-protected'),
        },
        masterKey,
        256
      );
    } else {
      rawKey = key;
    }

    return crypto.subtle.importKey(
      'raw',
      rawKey,
      'AES-GCM',
      false,
      ['encrypt', 'decrypt'],
    );
  };

  const encrypt = async (text: string, password: string) => {
    const textArray = textEncode(text);
    const aesKey = await getAesKey(password);
    const encrypted = await crypto.subtle.encrypt({
      name: 'AES-GCM',
      iv: vector,
    }, aesKey, zlibSync(textArray) as Uint8Array<ArrayBuffer>);
    return base64.encode(new Uint8Array(encrypted));
  }

  const decrypt = async (text: string, password: string) => {
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
    get params(): CryptoParams {
      return {
        key58: base58.encode(key),
        vector64: base64.encode(vector),
        salt64: base64.encode(salt),
      };
    },
  };
}

export default Crypto;
