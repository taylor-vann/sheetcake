let focusedStyle;
let stub = -1;
const styleReocrd = {
};
const getStub = ()=>{
    stub += 1;
    return stub;
};
const getStyleRecord1 = ()=>styleReocrd
;
const getFocusedStyle1 = ()=>focusedStyle
;
const constructStylesheet = ()=>{
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    if (style.sheet !== null) {
        return style.sheet;
    }
};
const queueStylesheet1 = (name)=>{
    focusedStyle = name;
    let stylesheet = styleReocrd[name]?.stylesheet;
    if (stylesheet) {
        return stylesheet;
    }
    stylesheet = constructStylesheet();
    styleReocrd[name] = {
        stylesheet,
        rules: []
    };
    return stylesheet;
};
const getStylesheet1 = ()=>{
    return styleReocrd[focusedStyle]?.stylesheet;
};
const getStylesheetText1 = ()=>{
    const styleRules = styleReocrd[focusedStyle];
    if (styleRules === undefined) {
        return;
    }
    return styleRules.rules.join("\n");
};
const appendStyle = (style)=>{
    const styleChunk = styleReocrd[focusedStyle];
    if (styleChunk === undefined) {
        return;
    }
    const { stylesheet , rules  } = styleChunk;
    stylesheet?.insertRule(style, rules.length);
    rules.push(style);
};
let prefix = "";
const createOptimist = ()=>Math.floor(Math.random() * 4096).toString(16)
;
const optimistA = createOptimist();
const optimistB = createOptimist();
const setPrefix1 = (updatedPrefix)=>{
    prefix = updatedPrefix;
};
const getID = ()=>{
    const stylesheetName = getFocusedStyle1();
    const stub1 = getStub().toString(16);
    const uniqueID = `_${prefix}${stylesheetName}_${stub1}_${optimistA}_${optimistB}`;
    return uniqueID;
};
const getTemplateAsStr = (templateArray, injections)=>{
    const styleIntegrals = [];
    const templateLength = templateArray.length;
    let index = 0;
    while(index < templateLength){
        const templatePiece = templateArray[index];
        const injection = injections[index];
        styleIntegrals.push(templatePiece);
        styleIntegrals.push(injection);
        index += 1;
    }
    const templatePiece = templateArray[index];
    styleIntegrals.push(templatePiece);
    return styleIntegrals.join("");
};
const style1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${id} {${template}}`;
    appendStyle(builtStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@keyframes _${id} {${template}}`;
    appendStyle(builtStyle);
    return id;
};
const getSelector = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${id}:${selector} {${template}}`;
    appendStyle(builtStyle);
    return id;
};
const getAttributeSelector = ({ selector , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `.${getID()}[${selector}] {${template}}`;
    appendStyle(builtStyle);
    return id;
};
const getMediaQuery = ({ mediaQuery , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@media ${mediaQuery} {\n    .${id} {${template}}\n  }`;
    appendStyle(builtStyle);
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
export { getFocusedStyle1 as getFocusedStyle, getStyleRecord1 as getStyleRecord, getStylesheet1 as getStylesheet, getStylesheetText1 as getStylesheetText, queueStylesheet1 as queueStylesheet };
