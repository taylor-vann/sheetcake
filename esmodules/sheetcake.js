let stub = 0;
const getID = (prefix)=>{
    const uniqueID = `${prefix}_${stub.toString(16)}`;
    stub += 1;
    return uniqueID;
};
const styleSheetElement = document.createElement("style");
document.head.appendChild(styleSheetElement);
let stylesheet;
if (styleSheetElement.sheet !== null) {
    stylesheet = styleSheetElement.sheet;
}
const appendStyleToStylesheet = (style)=>{
    if (stylesheet !== undefined) {
        stylesheet.insertRule(style, stylesheet.cssRules.length);
    }
};
const fragment1 = (templateArray, ...injections)=>{
    return getTemplateAsStr(templateArray, injections);
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
const style = ({ prefix , templateArray , injections ,  })=>{
    const id = getID(prefix);
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `.${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const keyframe = ({ prefix , templateArray , injections ,  })=>{
    const id = getID(prefix);
    const template = getTemplateAsStr(templateArray, injections);
    const constructedStyle = `@keyframes ${id} {${template}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const mediaQuery = ({ prefix , query , fragment: fragment1 ,  })=>{
    const id = getID(prefix);
    const constructedStyle = `@media ${query} {\n    .${id} {${fragment1}}\n  }`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const selector = ({ prefix , cssSelector , fragment: fragment1 ,  })=>{
    const id = getID(prefix);
    const constructedStyle = `.${getID(id)}:${cssSelector} {${fragment1}}`;
    appendStyleToStylesheet(constructedStyle);
    return id;
};
const createInterface1 = (prefix)=>{
    return {
        style: (templateArray, ...injections)=>{
            return style({
                injections,
                prefix,
                templateArray
            });
        },
        keyframe: (templateArray, ...injections)=>{
            return keyframe({
                injections,
                prefix,
                templateArray
            });
        },
        mediaQuery: (query, fragment1)=>{
            return mediaQuery({
                fragment: fragment1,
                prefix,
                query
            });
        },
        selector: (cssSelector, fragment1)=>{
            return selector({
                cssSelector,
                fragment: fragment1,
                prefix
            });
        }
    };
};
export { createInterface1 as createInterface, fragment1 as fragment };
