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
const optimistic = Math.floor(Math.random() * 256).toString(16);
const getID = ()=>{
    const stub = stylesheet?.cssRules.length.toString(16);
    const uniqueID = `${optimistic}_${stylesheetIndex}_${stub}`;
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
    const constructedStyle = `.${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `@keyframes ${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getSelector = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `.${id}:${selector} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getAttribute = ({ selector , templateArray , injections  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `.${getID()}[${selector}] {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const getMediaQuery = ({ mediaQuery , selector , templateArray , injections ,  })=>{
    const id = getID();
    const template = getTemplateAsStr(templateArray, injections);
    let constructedStyle = `@media ${mediaQuery} {\n    .${id} {${template}}\n  }`;
    if (selector !== undefined) {
        constructedStyle = `@media ${mediaQuery} {\n      .${id}:${selector} {${template}}\n    }`;
    }
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const createSelector1 = (selector)=>{
    return (templateArray, ...injections)=>getSelector({
            selector,
            templateArray,
            injections
        })
    ;
};
const createAttribute1 = (selector)=>{
    return (templateArray, ...injections)=>getAttribute({
            selector,
            templateArray,
            injections
        })
    ;
};
const createMediaQuery1 = (mediaQuery, selector)=>{
    return (templateArray, ...injections)=>getMediaQuery({
            mediaQuery,
            selector,
            templateArray,
            injections
        })
    ;
};
const focus1 = createSelector1("focus");
const hover1 = createSelector1("hover");
const checked1 = createSelector1("checked");
const valid1 = createSelector1("valid");
const invalid1 = createSelector1("invalid");
const required1 = createSelector1("required");
const disabled1 = createSelector1("disabled");
const screen6411 = createMediaQuery1("screen and (min-width: 641px)");
const screen10081 = createMediaQuery1("screen and (min-width: 1008px)");
const landscape1 = createMediaQuery1("screen and (orientation: landscape)");
const portrait1 = createMediaQuery1("screen and (orientation: portrait)");
const print1 = createMediaQuery1("print");
export { keyframe1 as keyframe, createAttribute1 as createAttribute, createMediaQuery1 as createMediaQuery, createSelector1 as createSelector, style1 as style, checked1 as checked, disabled1 as disabled, focus1 as focus, hover1 as hover, invalid1 as invalid, landscape1 as landscape, portrait1 as portrait, print1 as print, required1 as required, screen10081 as screen1008, screen6411 as screen641, valid1 as valid };
