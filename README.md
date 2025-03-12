# [txt-secure.fr](https://txt-secure.fr) front end
A service to securely share text data, where data is encrypted/decrypted in browser so that server has zero knowledge of it.

Started as a modernization of kpaste from Infomaniak while it was still using outdated stuff (https://github.com/Infomaniak/kpaste/issues/11), \
it ended up as a complete rewrite, with streamlined UI and code.

It is not meant to be reused, but friction is reduced as it can be freely built.

## Reproducible builds
With corepack enabled, or yarn matching package.json `packageManager`,\
`yarn install --immutable && yarn build` produces the files used online.

