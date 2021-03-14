import {GetID} from "../type_flyweight/style_fixture.ts"

let stub = 0;

const getID: GetID = (prefix: string) => {
  const uniqueID = `${prefix}_${stub.toString(16)}`;
  stub += 1;

  return uniqueID;
};

export {getID}