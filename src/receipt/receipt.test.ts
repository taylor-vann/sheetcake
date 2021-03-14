// brian taylor vann
// compose tests

import { getID } from "./receipt.ts";

const title = "sheetcake:receipt";
const runTestsAsynchronously = true;

const getAnID = () => {
  const assertions = [];

  const id = getID("hello-world");
  if (id !== "hello-world_0") {
    assertions.push("id should be related to prefix");
  }

  return assertions;
};

const getThirtyOneIDs = () => {
    const assertions = [];
  
    let id = "";
    let count = 0;
    while (count < 31) {
      id = getID("hello-world");
      count += 1;
    }

    if (id !== "hello-world_1f") {
      assertions.push("id should be in hexidecimal");
    }
  
    return assertions;
  };

const tests = [getAnID, getThirtyOneIDs];

const unitTestReceipt = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestReceipt };
