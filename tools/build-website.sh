#!/bin/sh
set -e

git clone git@github.com:babel/babel.github.io.git
cd babel.github.io
ln -s .. _babel
make build
git commit -am "${TRAVIS_TAG}"
git push "https://${GH_TOKEN}@github.com/babel/babel.github.io"
