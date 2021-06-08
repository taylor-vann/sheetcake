const styleRecord = {
};
let stub = -1;
const getStub = ()=>{
    stub += 1;
    return stub;
};
const getStyleRecord = ()=>({
        ...styleRecord
    })
;
const constructStyleSheet = ()=>{
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    const sheet = style.sheet ?? undefined;
    document.head.removeChild(style);
    return sheet;
};
const getCSSStyleSheet = (names)=>{
    const sheet = constructStyleSheet();
    if (sheet === undefined) {
        return;
    }
    for (const name of names){
        const style = styleRecord[name];
        if (style) {
            sheet.insertRule(style);
        }
    }
    return sheet;
};
const getStylesAsText = (names)=>{
    let styles = "";
    for (const name of names){
        const rule = styleRecord[name];
        if (rule) {
            styles += rule;
        }
    }
    if (styles === "") {
        return;
    }
    return styles;
};
const appendStyle = (id, style)=>{
    styleRecord[id] = style;
};
const title = "sheetcake:sheet";
const testAppendStyle = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleLength = Object.entries(styles).length;
    appendStyle("example", `\n    .hello_world {\n      color: blue;\n    }\n  `);
    styles = getStyleRecord();
    const updatedStyleLength = Object.entries(styles).length;
    if (styleLength + 1 !== updatedStyleLength) {
        assertions.push("styleSheet length should have increased by 1.");
    }
    return assertions;
};
const tests3 = [
    testAppendStyle, 
];
const unitTestSheet = {
    title,
    tests: tests3,
    runTestsAsynchronously: true
};
const createOptimist = ()=>Math.floor(Math.random() * 4096).toString(16)
;
const optA = createOptimist();
const optB = createOptimist();
let prefix = "";
const setPrefix = (updatedPrefix)=>{
    prefix = updatedPrefix;
};
const getID = ()=>{
    const stub1 = getStub().toString(16);
    const uniqueID = `_${prefix}_${stub1}_${optA}_${optB}`;
    return uniqueID;
};
const getTemplateAsStr = (templateArray, injections)=>{
    const integrals = [];
    const length = templateArray.length;
    let index = 0;
    while(index < length){
        const chunk = templateArray[index];
        const injection = injections[index];
        integrals.push(chunk);
        integrals.push(injection);
        index += 1;
    }
    const chunk = templateArray[index];
    integrals.push(chunk);
    return integrals.join("");
};
const style = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${id} {${template}}`;
    appendStyle(id, builtStyle);
    return id;
};
const keyframe = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@keyframes _${id} {${template}}`;
    appendStyle(id, builtStyle);
    return id;
};
const getSelector = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${id}:${selector} {${template}}`;
    appendStyle(id, builtStyle);
    return id;
};
const getAttributeSelector = ({ selector , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${getID()}[${selector}] {${template}}`;
    appendStyle(id, builtStyle);
    return id;
};
const getMediaQuery = ({ mediaQuery , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@media ${mediaQuery} {\n    .${id} {${template}}\n  }`;
    appendStyle(id, builtStyle);
    return id;
};
const createSelector = (selector)=>{
    return (templateArray, ...injections)=>getSelector({
            injections,
            selector,
            templateArray
        })
    ;
};
const createAttributeSelector = (selector)=>{
    return (templateArray, ...injections)=>getAttributeSelector({
            injections,
            selector,
            templateArray
        })
    ;
};
const createMediaQuery = (mediaQuery)=>{
    return (templateArray, ...injections)=>getMediaQuery({
            injections,
            mediaQuery,
            templateArray
        })
    ;
};
const title1 = "sheetcake:template_functions";
const getTemplateArray = (templateArray)=>templateArray
;
const testGetId = ()=>{
    const assertions = [];
    const id = getID();
    const idSplit = id.split("_");
    if (idSplit.length !== 5) {
        assertions.push("getID should return a three part ID separated by '_' an underscore.");
    }
    return assertions;
};
const testStyle = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleCount = Object.entries(styles).length;
    style`\n    color: blue;\n  `;
    styles = getStyleRecord();
    const updatedStyleCount = Object.entries(styles).length;
    if (styleCount + 1 !== updatedStyleCount) {
        assertions.push("color should be blue.");
    }
    return assertions;
};
const testKeyframe = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleCount = Object.entries(styles).length;
    keyframe`\n    0%   { opacity: 0; }\n    50%  { opacity: 1; }\n    100% { opacity: 0; }\n  `;
    styles = getStyleRecord();
    const updatedStyleCount = Object.entries(styles).length;
    if (styleCount + 1 !== updatedStyleCount) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testGetTemplateAsStr = ()=>{
    const assertions = [];
    const expectedString = "hello, honeybear, how are you?";
    const templateArray = getTemplateArray`hello, ${""}, how are you?`;
    const templateStr = getTemplateAsStr(templateArray, [
        "honeybear"
    ]);
    if (templateStr !== expectedString) {
        assertions.push("templateStr did not match expectedString");
    }
    return assertions;
};
const testCreateSelector = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleCount = Object.entries(styles).length;
    const hover = createSelector("hover");
    hover`\n    color: yellow;\n  `;
    styles = getStyleRecord();
    const updatedStyleCount = Object.entries(styles).length;
    if (styleCount + 1 !== updatedStyleCount) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testCreateMediaQuery = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleCount = Object.entries(styles).length;
    const screen600 = createMediaQuery("screen and (min-width: 600px)");
    screen600`\n    color: green;\n  `;
    styles = getStyleRecord();
    const updatedStyleCount = Object.entries(styles).length;
    if (styleCount + 1 !== updatedStyleCount) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testCreateAttributeSelector = ()=>{
    const assertions = [];
    let styles = getStyleRecord();
    const styleCount = Object.entries(styles).length;
    const inputText = createAttributeSelector(`input="text"`);
    inputText`\n    color: purple;\n  `;
    styles = getStyleRecord();
    const updatedStyleCount = Object.entries(styles).length;
    if (styleCount + 1 !== updatedStyleCount) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const tests1 = [
    testGetId,
    testStyle,
    testKeyframe,
    testGetTemplateAsStr,
    testCreateSelector,
    testCreateMediaQuery,
    testCreateAttributeSelector, 
];
const unitTestTemplateFunctions = {
    title: title1,
    tests: tests1,
    runTestsAsynchronously: true
};
const tests2 = [
    unitTestSheet,
    unitTestTemplateFunctions, 
];
export { tests2 as tests };
