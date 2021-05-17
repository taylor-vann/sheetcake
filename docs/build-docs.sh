#!/bin/bash

# deno cache --reload ./scripts/demo.ts
deno bundle --config ./tsconfig.json ./scripts/demo.ts ./bundle/demo.js 