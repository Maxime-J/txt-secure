A service to securely share text data, where data is encrypted/decrypted in browser so that server has zero knowledge of it.

Started as a modernization of kpaste from Infomaniak while it was still using outdated stuff (https://github.com/Infomaniak/kpaste/issues/11), \
it ended up as a complete rewrite, with streamlined UI and code.

That code is only provided for security, transparency and license compliance.\
Backend not included.

Service available on [txt-secure.fr](https://txt-secure.fr/) for a limited number of countries.

## Reproducible builds
With corepack enabled, or yarn matching package.json `packageManager`,\
`yarn install --immutable && yarn build` produces the files used online.

## Encryption details
AES-GCM is used with a 256-bit key and a 96-bit IV,\
key based on a share specific key.

When a password is set:\
AES key is the result of `HKDF(share_key || PBKDF2(password))`\
with a 128-bit salt used for both derivation functions\
and 100000 PBKDF2 iterations.

Without password:\
share key is directly used as AES key.

Share key, IV and salt are all generated with cryptographically strong random values.

IV and salt are saved on server,\
share key is appended as a hash to share link (encoded in base 58).
