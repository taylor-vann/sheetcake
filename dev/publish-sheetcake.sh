#!/bin/bash

# build sheetcake
deno bundle --config ./tsconfig.json ./src/sheetcake.ts ./esmodules/sheetcake.js 
deno bundle --config ./tsconfig.json ./src/sheetcake.test.ts ./esmodules/sheetcake.test.js 

# copy into dist/$0
#
# 