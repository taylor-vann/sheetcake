const getStylesheetElement = ()=>{
    const stylesheetElement = document.createElement("style");
    document.head.appendChild(stylesheetElement);
    return stylesheetElement;
};
const getStylesheet = (element)=>{
    if (element !== undefined && element.sheet) {
        return element.sheet;
    }
};
const getSheetIndex = (stylesheetElement)=>{
    let stylesheetIndex = -1;
    if (stylesheetElement === undefined) {
        return stylesheetIndex;
    }
    const children = document.head.children;
    while(stylesheetIndex < children.length){
        stylesheetIndex += 1;
        if (children[stylesheetIndex] === stylesheetElement) {
            break;
        }
    }
    return stylesheetIndex;
};
const stylesheetElement = getStylesheetElement();
const stylesheet = getStylesheet(stylesheetElement);
const stylesheetIndex = getSheetIndex(stylesheetElement);
const title = "sheetcake:sheet";
const stylesheetExists = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be refined.");
    }
};
const stylesheetIndexExists = ()=>{
    const assertions = [];
    if (stylesheetIndex === -1) {
        assertions.push("stylesheet index be a positive integer.");
    }
};
const getStylesheetInstance = ()=>{
    const assertions = [];
    const element = getStylesheetElement();
    if (!(element instanceof Element)) {
        assertions.push("stylesheet should be an Element");
    }
    const stylesheet1 = getStylesheet(element);
    if (!(stylesheet1 instanceof CSSStyleSheet)) {
        assertions.push("stylesheet should be an instance of CSSStyleSheet");
    }
    const stylesheetIndex1 = getSheetIndex(element);
    if (stylesheetIndex1 === -1) {
        assertions.push("stylesheet index be a positive integer.");
    }
};
const tests3 = [
    stylesheetExists,
    stylesheetIndexExists,
    getStylesheetInstance
];
const unitTestSheet = {
    title,
    tests: tests3,
    runTestsAsynchronously: true
};
const optimist = Math.floor(Math.random() * 256).toString(16);
const getID = ()=>{
    const stub = stylesheet?.cssRules.length.toString(16);
    const uniqueID = `${optimist}_${stylesheetIndex}_${stub}`;
    return uniqueID;
};
const getTemplateAsStr = (templateArray, injections)=>{
    const requestedStyle = [];
    const templateLength = templateArray.length;
    let index = 0;
    while(index < templateLength){
        const templatePiece = templateArray[index];
        const injection = injections[index];
        requestedStyle.push(templatePiece);
        requestedStyle.push(injection);
        index += 1;
    }
    const templatePiece = templateArray[index];
    requestedStyle.push(templatePiece);
    return requestedStyle.join("");
};
const appendStyleToStylesheet = (style)=>{
    if (stylesheet !== undefined) {
        stylesheet.insertRule(style, stylesheet.cssRules.length);
    }
};
const style = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `._${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const keyframe = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `@keyframes _${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getSelector = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `._${id}:${selector} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getAttributeSelector = ({ selector , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `._${getID()}[${selector}] {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getMediaQuery = ({ mediaQuery , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `@media ${mediaQuery} {\n    ._${id} {${template}}\n  }`;
    appendStyleToStylesheet(constructedStyle);
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
const createMediaQuery = (mediaQuery, selector)=>{
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
const optimistIsOptimistic = ()=>{
    const assertions = [];
    if (optimist.length < 2) {
        assertions.push("optimist should have a length of 2");
    }
    return assertions;
};
const testGetId = ()=>{
    const assertions = [];
    const id = getID();
    const idSplit = id.split("_");
    if (idSplit.length !== 3) {
        assertions.push("getID should return a three part ID separated by '_' an underscore.");
    }
    return assertions;
};
const testAppendStyleToStylesheet = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    appendStyleToStylesheet(`\n    .hello_world {\n      color: blue;\n    }\n  `);
    if (styleCount + 1 !== stylesheet.cssRules.length) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testStyle = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    style`\n    color: blue;\n  `;
    if (styleCount + 1 !== stylesheet.cssRules.length) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testKeyframe = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    keyframe`\n    0%   { opacity: 0; }\n    50%  { opacity: 1; }\n    100% { opacity: 0; }\n  `;
    if (styleCount + 1 !== stylesheet.cssRules.length) {
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
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    const hover = createSelector("hover");
    hover`\n    color: blue;\n  `;
    if (styleCount + 1 !== stylesheet.cssRules.length) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testCreateMediaQuery = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    const screen600 = createMediaQuery("screen and (min-width: 600px)");
    screen600`\n    color: blue;\n  `;
    if (styleCount + 1 !== stylesheet.cssRules.length) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const testCreateAttributeSelector = ()=>{
    const assertions = [];
    if (stylesheet === undefined) {
        assertions.push("stylesheet should be defined");
        return assertions;
    }
    const styleCount = stylesheet.cssRules.length;
    const inputText = createAttributeSelector(`input="text"`);
    inputText`\n    color: blue;\n  `;
    if (styleCount + 1 !== stylesheet.cssRules.length) {
        assertions.push("stylesheet length should have increased by 1.");
    }
    return assertions;
};
const tests1 = [
    optimistIsOptimistic,
    testGetId,
    testAppendStyleToStylesheet,
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
