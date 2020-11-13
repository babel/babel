#!/bin/bash

echo "Please confirm you have stopped \`make watch\`. (y)es, [N]o: "

read CLEAR;

if [ "_$CLEAR" == "_y" ]; then
    make prepublish
    yarn release-tool publish
    make clean
fi
