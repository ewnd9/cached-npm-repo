# cached-npm-repo

[![Build Status](https://travis-ci.org/ewnd9/cached-npm-repo.svg?branch=master)](https://travis-ci.org/ewnd9/cached-npm-repo)

`$ npm repo <pgkg>` wrapper with cache for increasing page opening speed

## Install

```
$ npm install -g cached-npm-repo
```

## Usage

```
$ cached-npm-repo <pkg-name>
$ cached-npm-repo --delete <pkg-name> # clear cache in case of changing url
```

## Tips

Make an alias like in your `.bashrc` / `.zshrc`

```sh
alias npr="cached-npm-repo"
```

Cache (json file) could be found in `~/.config/configstore/cached-npm-repo.json`

## License

MIT © [ewnd9](http://ewnd9.com)
