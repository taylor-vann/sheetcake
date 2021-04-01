const getStylesheetElement = ()=>{
    const stylesheetElement = document.createElement("style");
    document.head.appendChild(stylesheetElement);
    return stylesheetElement;
};
const getStylesheet = (element)=>{
    return element?.sheet ?? undefined;
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
let stub = -1;
const getID = (prefix)=>{
    stub += 1;
    const uniqueID = `cake_${prefix}_${stub.toString(16)}`;
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
    const id = getID(stylesheetIndex);
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `.${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const keyframe1 = (templateArray, ...injections)=>{
    const id = getID(stylesheetIndex);
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `@keyframes ${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const selector1 = ({ selector: selector1 , templateArray , injections  })=>{
    const id = getID(stylesheetIndex);
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `.${id}:${selector1} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const mediaQuery1 = ({ mediaQuery: mediaQuery1 , selector: selector1 , templateArray , injections ,  })=>{
    const id = getID(stylesheetIndex);
    const template = getTemplateAsStr(templateArray, injections);
    let constructedStyle = `@media ${mediaQuery1} {\n    .${id} {${template}}\n  }`;
    if (selector1 !== undefined) {
        constructedStyle = `@media ${mediaQuery1} {\n      .${id}:${selector1} {${template}}\n    }`;
    }
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const focus1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "focus",
        templateArray,
        injections
    });
};
const hover1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "hover",
        templateArray,
        injections
    });
};
const checked1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "checked",
        templateArray,
        injections
    });
};
const valid1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "valid",
        templateArray,
        injections
    });
};
const invalid1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "invalid",
        templateArray,
        injections
    });
};
const required1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "required",
        templateArray,
        injections
    });
};
const disabled1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "disabled",
        templateArray,
        injections
    });
};
const firstChild1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "first-child",
        templateArray,
        injections
    });
};
const lastChild1 = (templateArray, ...injections)=>{
    return selector1({
        selector: "last-child",
        templateArray,
        injections
    });
};
const screen6411 = (templateArray, ...injections)=>{
    return mediaQuery1({
        mediaQuery: "screen and (min-width: 641px)",
        templateArray,
        injections
    });
};
const screen10081 = (templateArray, ...injections)=>{
    return mediaQuery1({
        mediaQuery: "screen and (min-width: 1008px)",
        templateArray,
        injections
    });
};
const landscape1 = (templateArray, ...injections)=>{
    return mediaQuery1({
        mediaQuery: "screen and (orientation: landscape)",
        templateArray,
        injections
    });
};
const portrait1 = (templateArray, ...injections)=>{
    return mediaQuery1({
        mediaQuery: "screen and (orientation: portrait)",
        templateArray,
        injections
    });
};
const print1 = (templateArray, ...injections)=>{
    return mediaQuery1({
        mediaQuery: "print",
        templateArray,
        injections
    });
};
export { keyframe1 as keyframe, mediaQuery1 as mediaQuery, selector1 as selector, style1 as style, checked1 as checked, disabled1 as disabled, focus1 as focus, firstChild1 as firstChild, hover1 as hover, invalid1 as invalid, landscape1 as landscape, lastChild1 as lastChild, portrait1 as portrait, print1 as print, required1 as required, screen10081 as screen1008, screen6411 as screen641, valid1 as valid };
