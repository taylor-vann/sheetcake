#!/bin/bash

deno bundle --config ./tsconfig.json ./src/sheetcake.ts ./esmodules/sheetcake.js 
deno bundle --config ./tsconfig.json ./src/sheetcake.test.ts ./esmodules/sheetcake.test.js 