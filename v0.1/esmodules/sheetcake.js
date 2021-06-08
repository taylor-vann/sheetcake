const styleRecord = {
};
let stub = -1;
const getStub = ()=>{
    stub += 1;
    return stub;
};
const getStyleRecord1 = ()=>({
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
const getCSSStyleSheet1 = (names)=>{
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
const getStylesAsText1 = (names)=>{
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
const createOptimist = ()=>Math.floor(Math.random() * 4096).toString(16)
;
const optA = createOptimist();
const optB = createOptimist();
let prefix = "";
const setPrefix1 = (updatedPrefix)=>{
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
const style1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${id} {${template}}`;
    appendStyle(id, builtStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
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
const createSelector1 = (selector)=>{
    return (templateArray, ...injections)=>getSelector({
            injections,
            selector,
            templateArray
        })
    ;
};
const createAttributeSelector1 = (selector)=>{
    return (templateArray, ...injections)=>getAttributeSelector({
            injections,
            selector,
            templateArray
        })
    ;
};
const createMediaQuery1 = (mediaQuery)=>{
    return (templateArray, ...injections)=>getMediaQuery({
            injections,
            mediaQuery,
            templateArray
        })
    ;
};
export { createAttributeSelector1 as createAttributeSelector, createMediaQuery1 as createMediaQuery, createSelector1 as createSelector, keyframe1 as keyframe, setPrefix1 as setPrefix, style1 as style };
export { getStyleRecord1 as getStyleRecord, getCSSStyleSheet1 as getCSSStyleSheet, getStylesAsText1 as getStylesAsText };
