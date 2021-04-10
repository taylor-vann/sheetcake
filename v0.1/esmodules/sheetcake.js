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
const style1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `._${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
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
export { keyframe1 as keyframe, createAttributeSelector1 as createAttributeSelector, createMediaQuery1 as createMediaQuery, createSelector1 as createSelector, style1 as style };
