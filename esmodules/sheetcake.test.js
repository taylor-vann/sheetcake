let stub = -1;
const getID = (prefix)=>{
    stub += 1;
    const uniqueID = `cake_${prefix}_${stub.toString(16)}`;
    return uniqueID;
};
const title = "sheetcake:receipt";
const getAnID = ()=>{
    const assertions = [];
    const id = getID("hello-world");
    if (id !== "hello-world_0") {
        assertions.push("id should be related to prefix");
    }
    return assertions;
};
const getThirtyOneIDs = ()=>{
    const assertions = [];
    let id = "";
    let count = 0;
    while(count < 31){
        id = getID("hello-world");
        count += 1;
    }
    if (id !== "hello-world_1f") {
        assertions.push("id should be in hexidecimal");
    }
    return assertions;
};
const tests2 = [
    getAnID,
    getThirtyOneIDs
];
const unitTestReceipt = {
    title,
    tests: tests2,
    runTestsAsynchronously: true
};
const tests1 = [
    unitTestReceipt
];
export { tests1 as tests };
