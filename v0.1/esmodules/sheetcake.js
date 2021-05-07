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
let prefix = "";
const optimist = Math.floor(Math.random() * 2056).toString(16);
const setPrefix1 = (updatedPrefix)=>{
    prefix = updatedPrefix;
};
const getID = ()=>{
    const stub = stylesheet?.cssRules.length.toString(16);
    const uniqueID = `${prefix}${optimist}_${stylesheetIndex}_${stub}`;
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
const style1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `._${id} {${template}}`;
    appendStyleToStylesheet(builtStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@keyframes _${id} {${template}}`;
    appendStyleToStylesheet(builtStyle);
    return id;
};
const getSelector = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `._${id}:${selector} {${template}}`;
    appendStyleToStylesheet(builtStyle);
    return id;
};
const getAttributeSelector = ({ selector , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `._${getID()}[${selector}] {${template}}`;
    appendStyleToStylesheet(builtStyle);
    return id;
};
const getMediaQuery = ({ mediaQuery , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const builtStyle = `@media ${mediaQuery} {\n    ._${id} {${template}}\n  }`;
    appendStyleToStylesheet(builtStyle);
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
const createMediaQuery1 = (mediaQuery, selector)=>{
    return (templateArray, ...injections)=>getMediaQuery({
            injections,
            mediaQuery,
            templateArray
        })
    ;
};
export { createAttributeSelector1 as createAttributeSelector, createMediaQuery1 as createMediaQuery, createSelector1 as createSelector, keyframe1 as keyframe, setPrefix1 as setPrefix, style1 as style };
