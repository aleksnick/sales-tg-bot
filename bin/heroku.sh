#!/usr/bin/env bash

if [ "$TARGET" == "SELLER-BOT" ]
  then
    (cd packages/n-seller-bot && yarn start)
fi