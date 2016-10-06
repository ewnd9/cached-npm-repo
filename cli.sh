#!/bin/bash

PKG=$1
FOUNDED=false

DIRNAME="$( cd "$( dirname "$(readlink -f ${BASH_SOURCE[0]})" )" && pwd )"
cd $DIRNAME

for f in $HOME/.npm/$PKG/*/package/package.json; do
  #
  # I can't preserve the versions order but GitHub should redirects in case of transfering
  #
  if [ -e "$f" ]; then
    URL=$(cat $f | jq ".repository.url")
    NORM=$(node -e "console.log(require('hosted-git-info').fromUrl($URL).browse())")
    xdg-open $NORM
    FOUNDED=true
  fi

  break
done

if [ $FOUNDED = false ]; then
  node $DIRNAME/cli.js $PKG
fi
