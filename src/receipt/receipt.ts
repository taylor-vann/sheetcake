import { GetID } from "../type_flyweight/style_fixture.ts";

let stub = -1;

const getID: GetID = (prefix) => {
  stub += 1;
  const uniqueID = `cake_${prefix}_${stub.toString(16)}`;

  return uniqueID;
};

export { getID };
