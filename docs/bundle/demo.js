const copy1 = (position) => {
  return {
    ...position,
  };
};
const increment = (template, position) => {
  const chunk = template.templateArray[position.arrayIndex];
  if (chunk === undefined) {
    return;
  }
  const templateLength = template.templateArray.length - 1;
  if (
    position.arrayIndex >= templateLength &&
    position.stringIndex >= chunk.length - 1
  ) {
    return;
  }
  if (chunk.length > 0) {
    position.stringIndex += 1;
    position.stringIndex %= chunk.length;
  }
  if (position.stringIndex === 0) {
    position.arrayIndex += 1;
  }
  return position;
};
const decrement = (template, position) => {
  const chunk = template.templateArray[position.arrayIndex];
  if (chunk === undefined) {
    return;
  }
  if (position.arrayIndex <= 0 && position.stringIndex <= 0) {
    return;
  }
  position.stringIndex -= 1;
  if (position.arrayIndex > 0 && position.stringIndex < 0) {
    position.arrayIndex -= 1;
    const chunk1 = template.templateArray[position.arrayIndex];
    position.stringIndex = chunk1.length - 1;
    if (chunk1 === "") {
      position.stringIndex = chunk1.length;
    }
  }
  return position;
};
const getCharAtPosition = (template, position) => {
  return template.templateArray[position.arrayIndex]?.[position.stringIndex];
};
const DEFAULT_POSITION = {
  arrayIndex: 0,
  stringIndex: 0,
};
const create = (position = DEFAULT_POSITION) => ({
  origin: {
    ...position,
  },
  target: {
    ...position,
  },
});
const createFollowingVector = (template, vector) => {
  const followingVector = copy2(vector);
  if (increment(template, followingVector.target)) {
    followingVector.origin = copy1(followingVector.target);
    return followingVector;
  }
};
const copy2 = (vector) => {
  return {
    origin: copy1(vector.origin),
    target: copy1(vector.target),
  };
};
const incrementOrigin = (template, vector) => {
  if (increment(template, vector.origin)) {
    return vector;
  }
  return;
};
const decrementOrigin = (template, vector) => {
  if (decrement(template, vector.origin)) {
    return vector;
  }
  return;
};
const incrementTarget = (template, vector) => {
  if (increment(template, vector.target)) {
    return vector;
  }
  return;
};
const decrementTarget = (template, vector) => {
  if (decrement(template, vector.target)) {
    return vector;
  }
  return;
};
const getTextFromTarget = (template, vector) => {
  const templateArray = template.templateArray;
  const { arrayIndex, stringIndex } = vector.target;
  if (arrayIndex > templateArray.length - 1) {
    return;
  }
  if (stringIndex > templateArray[arrayIndex].length - 1) {
    return;
  }
  return templateArray[arrayIndex][stringIndex];
};
const hasOriginEclipsedTaraget = (vector) => {
  if (
    vector.origin.arrayIndex >= vector.target.arrayIndex &&
    vector.origin.stringIndex >= vector.target.stringIndex
  ) {
    return true;
  }
  return false;
};
const getText = (template, vector) => {
  if (vector.target.arrayIndex === vector.origin.arrayIndex) {
    const distance = vector.target.stringIndex - vector.origin.stringIndex + 1;
    const templateText = template.templateArray[vector.origin.arrayIndex];
    const copiedText = templateText.substr(vector.origin.stringIndex, distance);
    return copiedText;
  }
  const texts = [];
  const templateTextIndex = vector.origin.stringIndex;
  let templateText = template.templateArray[templateTextIndex];
  if (templateText === undefined) {
    return;
  }
  let distance = templateText.length - templateTextIndex;
  let copiedText = templateText.substr(templateTextIndex, distance);
  texts.push(copiedText);
  let tail = vector.origin.arrayIndex + 1;
  while (tail < vector.target.arrayIndex) {
    texts.push(template.templateArray[tail]);
    tail += 1;
  }
  templateText = template.templateArray[vector.target.arrayIndex];
  if (templateText === undefined) {
    return;
  }
  distance = vector.target.stringIndex + 1;
  copiedText = templateText.substr(0, distance);
  texts.push(copiedText);
  return texts.join("");
};
const BREAK_RUNES = {
  " ": true,
  "\n": true,
};
const crawlForTagName = (template, innerXmlBounds) => {
  let positionChar = getCharAtPosition(template, innerXmlBounds.origin);
  if (positionChar === undefined || BREAK_RUNES[positionChar]) {
    return;
  }
  const tagVector = copy2(innerXmlBounds);
  while (
    BREAK_RUNES[positionChar] === undefined &&
    !hasOriginEclipsedTaraget(tagVector)
  ) {
    if (incrementOrigin(template, tagVector) === undefined) {
      return;
    }
    positionChar = getCharAtPosition(template, tagVector.origin);
    if (positionChar === undefined) {
      return;
    }
  }
  const adjustedVector = {
    origin: {
      ...innerXmlBounds.origin,
    },
    target: {
      ...tagVector.origin,
    },
  };
  if (positionChar !== undefined && BREAK_RUNES[positionChar]) {
    decrementTarget(template, adjustedVector);
  }
  return adjustedVector;
};
const QUOTE_RUNE = '"';
const ASSIGN_RUNE = "=";
const ATTRIBUTE_FOUND = "ATTRIBUTE_FOUND";
const ATTRIBUTE_ASSIGNMENT = "ATTRIBUTE_ASSIGNMENT";
const IMPLICIT_ATTRIBUTE = "IMPLICIT_ATTRIBUTE";
const EXPLICIT_ATTRIBUTE = "EXPLICIT_ATTRIBUTE";
const INJECTED_ATTRIBUTE = "INJECTED_ATTRIBUTE";
const BREAK_RUNES1 = {
  " ": true,
  "\n": true,
  "/": true,
};
const getAttributeName = (template, vectorBounds) => {
  let positionChar = getCharAtPosition(template, vectorBounds.origin);
  if (positionChar === undefined || BREAK_RUNES1[positionChar]) {
    return;
  }
  const bounds = copy2(vectorBounds);
  let tagNameCrawlState = ATTRIBUTE_FOUND;
  while (
    tagNameCrawlState === ATTRIBUTE_FOUND &&
    !hasOriginEclipsedTaraget(vectorBounds)
  ) {
    if (incrementOrigin(template, vectorBounds) === undefined) {
      tagNameCrawlState = IMPLICIT_ATTRIBUTE;
      break;
    }
    positionChar = getCharAtPosition(template, vectorBounds.origin);
    if (positionChar === undefined) {
      return;
    }
    tagNameCrawlState = ATTRIBUTE_FOUND;
    if (BREAK_RUNES1[positionChar]) {
      tagNameCrawlState = IMPLICIT_ATTRIBUTE;
    }
    if (positionChar === ASSIGN_RUNE) {
      tagNameCrawlState = ATTRIBUTE_ASSIGNMENT;
    }
  }
  const attributeVector = {
    origin: {
      ...bounds.origin,
    },
    target: {
      ...vectorBounds.origin,
    },
  };
  if (tagNameCrawlState === ATTRIBUTE_FOUND) {
    return {
      kind: IMPLICIT_ATTRIBUTE,
      attributeVector,
    };
  }
  if (tagNameCrawlState === IMPLICIT_ATTRIBUTE) {
    if (BREAK_RUNES1[positionChar]) {
      decrementTarget(template, attributeVector);
    }
    return {
      kind: IMPLICIT_ATTRIBUTE,
      attributeVector,
    };
  }
  if (tagNameCrawlState === ATTRIBUTE_ASSIGNMENT) {
    decrementTarget(template, attributeVector);
    return {
      kind: EXPLICIT_ATTRIBUTE,
      valueVector: {
        origin: {
          arrayIndex: -1,
          stringIndex: -1,
        },
        target: {
          arrayIndex: -1,
          stringIndex: -1,
        },
      },
      attributeVector,
    };
  }
};
const getAttributeValue = (template, vectorBounds, attributeAction) => {
  let positionChar = getCharAtPosition(template, vectorBounds.origin);
  if (positionChar !== ASSIGN_RUNE) {
    return;
  }
  const bound = copy2(vectorBounds);
  incrementOrigin(template, vectorBounds);
  positionChar = getCharAtPosition(template, vectorBounds.origin);
  if (positionChar !== QUOTE_RUNE) {
    return;
  }
  const arrayIndex = vectorBounds.origin.arrayIndex;
  const valVector = copy2(vectorBounds);
  if (incrementOrigin(template, vectorBounds) === undefined) {
    return;
  }
  positionChar = getCharAtPosition(template, vectorBounds.origin);
  let arrayIndexDistance = Math.abs(
    arrayIndex - vectorBounds.origin.arrayIndex,
  );
  if (arrayIndexDistance === 1 && positionChar === QUOTE_RUNE) {
    return {
      kind: INJECTED_ATTRIBUTE,
      injectionID: arrayIndex,
      attributeVector: attributeAction.attributeVector,
      valueVector: {
        origin: {
          ...valVector.origin,
        },
        target: {
          ...vectorBounds.origin,
        },
      },
    };
  }
  if (arrayIndexDistance > 0) {
    return;
  }
  while (
    positionChar !== QUOTE_RUNE && !hasOriginEclipsedTaraget(vectorBounds)
  ) {
    if (incrementOrigin(template, vectorBounds) === undefined) {
      return;
    }
    positionChar = getCharAtPosition(template, vectorBounds.origin);
    arrayIndexDistance = Math.abs(arrayIndex - vectorBounds.origin.arrayIndex);
    if (arrayIndexDistance > 0) {
      return;
    }
  }
  if (
    attributeAction.kind === "EXPLICIT_ATTRIBUTE" && positionChar === QUOTE_RUNE
  ) {
    attributeAction.valueVector = {
      origin: {
        ...valVector.origin,
      },
      target: {
        ...vectorBounds.origin,
      },
    };
    return attributeAction;
  }
};
const crawlForAttribute = (template, vectorBounds) => {
  const attrResults = getAttributeName(template, vectorBounds);
  if (attrResults === undefined) {
    return;
  }
  if (attrResults.kind === "IMPLICIT_ATTRIBUTE") {
    return attrResults;
  }
  return getAttributeValue(template, vectorBounds, attrResults);
};
const incrementOriginToNextSpaceRune = (template, innerXmlBounds) => {
  let positionChar = getCharAtPosition(template, innerXmlBounds.origin);
  if (positionChar === undefined) {
    return;
  }
  while (positionChar !== " ") {
    if (hasOriginEclipsedTaraget(innerXmlBounds)) {
      return;
    }
    if (incrementOrigin(template, innerXmlBounds) === undefined) {
      return;
    }
    positionChar = getCharAtPosition(template, innerXmlBounds.origin);
    if (positionChar === undefined) {
      return;
    }
  }
  return innerXmlBounds;
};
const incrementOriginToNextCharRune = (template, innerXmlBounds) => {
  let positionChar = getCharAtPosition(template, innerXmlBounds.origin);
  if (positionChar === undefined) {
    return;
  }
  while (positionChar === " ") {
    if (hasOriginEclipsedTaraget(innerXmlBounds)) {
      return;
    }
    if (incrementOrigin(template, innerXmlBounds) === undefined) {
      return;
    }
    positionChar = getCharAtPosition(template, innerXmlBounds.origin);
  }
  return innerXmlBounds;
};
const appendNodeAttributeIntegrals = ({ integrals, template, chunk }) => {
  let safety = 0;
  while (!hasOriginEclipsedTaraget(chunk) && safety < 256) {
    safety += 1;
    if (incrementOriginToNextSpaceRune(template, chunk) === undefined) {
      return;
    }
    if (incrementOriginToNextCharRune(template, chunk) === undefined) {
      return;
    }
    const attrCrawl = crawlForAttribute(template, chunk);
    if (attrCrawl === undefined) {
      return;
    }
    if (attrCrawl.kind === "IMPLICIT_ATTRIBUTE") {
      chunk.origin = {
        ...attrCrawl.attributeVector.target,
      };
    }
    if (attrCrawl.kind === "EXPLICIT_ATTRIBUTE") {
      chunk.origin = {
        ...attrCrawl.valueVector.target,
      };
    }
    if (attrCrawl.kind === "INJECTED_ATTRIBUTE") {
      chunk.origin = {
        ...attrCrawl.valueVector.target,
      };
    }
    integrals.push(attrCrawl);
  }
  return integrals;
};
const appendNodeIntegrals = ({ kind, integrals, template, chunk }) => {
  const innerXmlBounds = copy2(chunk.vector);
  incrementOrigin(template, innerXmlBounds);
  decrementTarget(template, innerXmlBounds);
  const tagNameVector = crawlForTagName(template, innerXmlBounds);
  if (tagNameVector === undefined) {
    return;
  }
  integrals.push({
    kind,
    tagNameVector,
  });
  const followingVector = createFollowingVector(template, tagNameVector);
  if (followingVector === undefined) {
    return;
  }
  followingVector.target = {
    ...innerXmlBounds.target,
  };
  appendNodeAttributeIntegrals({
    integrals,
    template,
    chunk: followingVector,
  });
  return integrals;
};
const appendCloseNodeIntegrals = ({ integrals, template, chunk }) => {
  const innerXmlBounds = copy2(chunk.vector);
  incrementOrigin(template, innerXmlBounds);
  incrementOrigin(template, innerXmlBounds);
  decrementTarget(template, innerXmlBounds);
  const tagNameVector = crawlForTagName(template, copy2(innerXmlBounds));
  if (tagNameVector === undefined) {
    return;
  }
  tagNameVector.origin = {
    ...innerXmlBounds.origin,
  };
  integrals.push({
    kind: "CLOSE_NODE",
    tagNameVector,
  });
  return integrals;
};
const appendContentIntegrals = ({ integrals, template, chunk }) => {
  const { origin, target } = chunk.vector;
  if (origin.arrayIndex === target.arrayIndex) {
    integrals.push({
      kind: "TEXT",
      textVector: chunk.vector,
    });
    return;
  }
  let stringIndex = template.templateArray[origin.arrayIndex].length - 1;
  let textVector = {
    origin,
    target: {
      arrayIndex: origin.arrayIndex,
      stringIndex,
    },
  };
  integrals.push({
    kind: "TEXT",
    textVector,
  });
  integrals.push({
    kind: "CHUNK_ARRAY_INJECTION",
    injectionID: origin.arrayIndex,
  });
  let arrayIndex = origin.arrayIndex + 1;
  while (arrayIndex < target.arrayIndex) {
    stringIndex = template.templateArray[arrayIndex].length - 1;
    textVector = {
      origin: {
        arrayIndex,
        stringIndex: 0,
      },
      target: {
        arrayIndex,
        stringIndex,
      },
    };
    integrals.push({
      kind: "TEXT",
      textVector,
    });
    integrals.push({
      kind: "CHUNK_ARRAY_INJECTION",
      injectionID: arrayIndex,
    });
    arrayIndex += 1;
  }
  textVector = {
    origin: {
      arrayIndex: target.arrayIndex,
      stringIndex: 0,
    },
    target,
  };
  integrals.push({
    kind: "TEXT",
    textVector,
  });
  return integrals;
};
const buildIntegrals = ({ template, skeleton }) => {
  const integrals = [];
  for (const chunk of skeleton) {
    const nodeType = chunk.nodeType;
    const origin = chunk.vector.origin;
    if (origin.stringIndex === 0 && origin.arrayIndex !== 0) {
      integrals.push({
        kind: "CHUNK_ARRAY_INJECTION",
        injectionID: origin.arrayIndex - 1,
      });
    }
    if (nodeType === "OPENED_FOUND") {
      appendNodeIntegrals({
        kind: "NODE",
        integrals,
        template,
        chunk,
      });
    }
    if (nodeType === "CLOSED_FOUND") {
      appendCloseNodeIntegrals({
        integrals,
        template,
        chunk,
      });
    }
    if (nodeType === "CONTENT") {
      appendContentIntegrals({
        integrals,
        template,
        chunk,
      });
    }
    if (nodeType === "INDEPENDENT_FOUND") {
      appendNodeIntegrals({
        kind: "SELF_CLOSING_NODE",
        integrals,
        template,
        chunk,
      });
    }
  }
  return integrals;
};
const routers = {
  CONTENT: {
    "<": "OPENED",
    DEFAULT: "CONTENT",
  },
  OPENED: {
    " ": "CONTENT",
    "\n": "CONTENT",
    "<": "OPENED",
    "/": "CLOSED",
    DEFAULT: "OPENED_VALID",
  },
  ATTRIBUTE: {
    "\\": "ATTRIBUTE_ESC_CHAR",
    '"': "OPENED_VALID",
    DEFAULT: "ATTRIBUTE",
  },
  ATTRIBUTE_ESC_CHAR: {
    DEFAULT: "ATTRIBUTE",
  },
  OPENED_VALID: {
    "<": "OPENED",
    "/": "INDEPENDENT_VALID",
    ">": "OPENED_FOUND",
    '"': "ATTRIBUTE",
    DEFAULT: "OPENED_VALID",
  },
  CLOSED: {
    " ": "CONTENT",
    "\n": "CONTENT",
    "<": "OPENED",
    DEFAULT: "CLOSED_VALID",
  },
  CLOSED_VALID: {
    "<": "OPENED",
    ">": "CLOSED_FOUND",
    DEFAULT: "CLOSED_VALID",
  },
  INDEPENDENT_VALID: {
    "<": "OPENED",
    ">": "INDEPENDENT_FOUND",
    DEFAULT: "INDEPENDENT_VALID",
  },
};
const validSieve = {
  OPENED_VALID: "OPENED_VALID",
  CLOSED_VALID: "CLOSED_VALID",
  INDEPENDENT_VALID: "INDEPENDENT_VALID",
};
const confirmedSieve = {
  OPENED_FOUND: "OPENED_FOUND",
  CLOSED_FOUND: "CLOSED_FOUND",
  INDEPENDENT_FOUND: "INDEPENDENT_FOUND",
};
const setStartStateProperties = (template, previousCrawl) => {
  if (previousCrawl === undefined) {
    return {
      nodeType: "CONTENT",
      vector: create(),
    };
  }
  const followingVector = createFollowingVector(template, previousCrawl.vector);
  if (followingVector === undefined) {
    return;
  }
  const crawlState = {
    nodeType: "CONTENT",
    vector: followingVector,
  };
  return crawlState;
};
const setNodeType = (template, crawlState) => {
  const nodeStates = routers[crawlState.nodeType];
  const __char = getCharAtPosition(template, crawlState.vector.target);
  if (nodeStates !== undefined && __char !== undefined) {
    const defaultNodeType = nodeStates["DEFAULT"] ?? "CONTENT";
    crawlState.nodeType = nodeStates[__char] ?? defaultNodeType;
  }
  return crawlState;
};
const crawl = (template, previousCrawl) => {
  const crawlState = setStartStateProperties(template, previousCrawl);
  if (crawlState === undefined) {
    return;
  }
  setNodeType(template, crawlState);
  let openedPosition;
  while (incrementTarget(template, crawlState.vector)) {
    if (
      validSieve[crawlState.nodeType] === undefined &&
      crawlState.nodeType !== "ATTRIBUTE" &&
      crawlState.vector.target.stringIndex === 0
    ) {
      crawlState.nodeType = "CONTENT";
    }
    setNodeType(template, crawlState);
    if (crawlState.nodeType === "OPENED") {
      openedPosition = copy1(crawlState.vector.target);
    }
    if (confirmedSieve[crawlState.nodeType]) {
      if (openedPosition !== undefined) {
        crawlState.vector.origin = openedPosition;
      }
      break;
    }
  }
  return crawlState;
};
const DEFAULT_CRAWL_RESULTS = {
  nodeType: "CONTENT",
  vector: {
    origin: {
      arrayIndex: 0,
      stringIndex: 0,
    },
    target: {
      arrayIndex: 0,
      stringIndex: 0,
    },
  },
};
const SKELETON_SIEVE = {
  ["OPENED_FOUND"]: "OPENED",
  ["INDEPENDENT_FOUND"]: "INDEPENDENT",
  ["CLOSED_FOUND"]: "CLOSED",
  ["CONTENT"]: "CONTENT",
};
const isDistanceGreaterThanOne = ({ template, origin, target }) => {
  if (
    hasOriginEclipsedTaraget({
      origin,
      target,
    })
  ) {
    return false;
  }
  const originCopy = copy1(origin);
  if (increment(template, originCopy) === undefined) {
    return false;
  }
  if (
    target.arrayIndex === originCopy.arrayIndex &&
    target.stringIndex === originCopy.stringIndex
  ) {
    return false;
  }
  return true;
};
const buildMissingStringNode = ({ template, previousCrawl, currentCrawl }) => {
  const originPos = previousCrawl !== undefined
    ? previousCrawl.vector.target
    : DEFAULT_CRAWL_RESULTS.vector.target;
  const targetPos = currentCrawl.vector.origin;
  if (
    !isDistanceGreaterThanOne({
      template,
      origin: originPos,
      target: targetPos,
    })
  ) {
    return;
  }
  const origin = previousCrawl === undefined
    ? copy1(DEFAULT_CRAWL_RESULTS.vector.target)
    : copy1(previousCrawl.vector.target);
  const target = copy1(currentCrawl.vector.origin);
  decrement(template, target);
  if (previousCrawl !== undefined) {
    increment(template, origin);
  }
  return {
    nodeType: "CONTENT",
    vector: {
      origin,
      target,
    },
  };
};
const buildSkeleton = (template) => {
  const skeleton = [];
  let previousCrawl;
  let currentCrawl = crawl(template, previousCrawl);
  let depth = 0;
  while (currentCrawl && depth < 128) {
    const stringBone = buildMissingStringNode({
      template,
      previousCrawl,
      currentCrawl,
    });
    if (stringBone) {
      skeleton.push(stringBone);
    }
    if (SKELETON_SIEVE[currentCrawl.nodeType]) {
      skeleton.push(currentCrawl);
    }
    previousCrawl = currentCrawl;
    currentCrawl = crawl(template, previousCrawl);
    depth += 1;
  }
  return skeleton;
};
const popSelfClosingNode = (rs) => {
  const parent = rs.stack[rs.stack.length - 1];
  if (
    parent !== undefined && parent.kind === "NODE" &&
    parent.selfClosing === true
  ) {
    rs.stack.pop();
    rs.lastNodes.pop();
  }
};
const createTextNode = ({ hooks, rs, integral }) => {
  popSelfClosingNode(rs);
  const text = getText(rs.template, integral.textVector);
  if (text === undefined) {
    return;
  }
  const descendant = hooks.createTextNode(text);
  const parentNode = rs.stack[rs.stack.length - 1]?.node;
  const lastNodeIndex = rs.lastNodes.length - 1;
  const leftNode = rs.lastNodes[lastNodeIndex];
  if (rs.stack.length === 0) {
    rs.siblings.push([
      descendant,
    ]);
  } else {
    hooks.insertDescendant({
      parentNode,
      descendant,
      leftNode,
    });
  }
  rs.lastNodes[lastNodeIndex] = descendant;
};
const createNode = ({ hooks, rs, integral }) => {
  popSelfClosingNode(rs);
  const tagName = getText(rs.template, integral.tagNameVector);
  if (tagName === undefined) {
    return;
  }
  const parent = rs.stack[rs.stack.length - 1];
  const descendant = hooks.createNode(tagName);
  const parentNode = parent?.node;
  const lastNodeIndex = rs.lastNodes.length - 1;
  const leftNode = rs.lastNodes[lastNodeIndex];
  const isSiblingLevel = rs.stack.length === 0;
  if (isSiblingLevel) {
    rs.siblings.push([
      descendant,
    ]);
  } else {
    hooks.insertDescendant({
      parentNode,
      leftNode,
      descendant,
    });
  }
  rs.lastNodes[lastNodeIndex] = descendant;
  rs.lastNodes.push(undefined);
  const selfClosing = integral.kind === "SELF_CLOSING_NODE";
  rs.stack.push({
    kind: "NODE",
    node: descendant,
    selfClosing,
    tagName,
  });
};
const closeNode = ({ hooks, rs, integral }) => {
  if (rs.stack.length === 0) {
    return;
  }
  popSelfClosingNode(rs);
  const tagName = getText(rs.template, integral.tagNameVector);
  const nodeBit = rs.stack[rs.stack.length - 1];
  if (nodeBit.kind !== "NODE") {
    return;
  }
  if (nodeBit.tagName === tagName) {
    rs.stack.pop();
    rs.lastNodes.pop();
  }
};
const createChunkArrayInjection = ({ hooks, rs, integral }) => {
  popSelfClosingNode(rs);
  const parentNode = rs.stack[rs.stack.length - 1]?.node;
  const lastNodeIndex = rs.lastNodes.length - 1;
  const leftNode = rs.lastNodes[lastNodeIndex];
  const injection = rs.template.injections[integral.injectionID];
  const isSiblingLevel = rs.stack.length === 0;
  let siblingIndex;
  if (!Array.isArray(injection)) {
    const text = String(injection);
    const textNode = hooks.createTextNode(text);
    if (rs.stack.length === 0) {
      rs.siblings.push([
        textNode,
      ]);
      siblingIndex = rs.siblings.length - 1;
    } else {
      hooks.insertDescendant({
        descendant: textNode,
        parentNode,
        leftNode,
      });
    }
    rs.descendants[integral.injectionID] = {
      kind: "TEXT",
      params: {
        textNode,
        leftNode,
        parentNode,
        text,
        siblingIndex,
      },
    };
    rs.lastNodes[lastNodeIndex] = textNode;
    return;
  }
  const siblingsFromContextArray = [];
  let prevSibling = leftNode;
  for (const contextID in injection) {
    const context = injection[contextID];
    const siblings = context.getSiblings();
    if (isSiblingLevel) {
      for (const siblingID in siblings) {
        const sibling = siblings[siblingID];
        siblingsFromContextArray.push(sibling);
        prevSibling = sibling;
      }
    } else {
      prevSibling = context.mount(parentNode, prevSibling);
    }
  }
  if (isSiblingLevel) {
    rs.siblings.push(siblingsFromContextArray);
    siblingIndex = rs.siblings.length - 1;
  }
  rs.descendants[integral.injectionID] = {
    kind: "CHUNK_ARRAY",
    params: {
      chunkArray: injection,
      leftNode,
      parentNode,
      siblingIndex,
    },
  };
  rs.lastNodes[lastNodeIndex] = prevSibling;
};
const appendExplicitAttribute = ({ hooks, rs, integral }) => {
  const node = rs.stack[rs.stack.length - 1].node;
  const attribute = getText(rs.template, integral.attributeVector);
  if (attribute === undefined) {
    return;
  }
  const valueVector = copy2(integral.valueVector);
  incrementOrigin(rs.template, valueVector);
  decrementTarget(rs.template, valueVector);
  const value = getText(rs.template, valueVector);
  if (value === undefined) {
    return;
  }
  hooks.setAttribute({
    references: rs.references,
    node,
    attribute,
    value,
  });
};
const appendImplicitAttribute = ({ hooks, rs, integral }) => {
  if (rs.stack.length === 0) {
    return;
  }
  const { node } = rs.stack[rs.stack.length - 1];
  const attribute = getText(rs.template, integral.attributeVector);
  if (attribute === undefined) {
    return;
  }
  hooks.setAttribute({
    value: true,
    references: rs.references,
    node,
    attribute,
  });
};
const appendInjectedAttribute = ({ hooks, rs, integral }) => {
  if (rs.stack.length === 0) {
    return;
  }
  const { node } = rs.stack[rs.stack.length - 1];
  const attribute = getText(rs.template, integral.attributeVector);
  if (attribute === undefined) {
    return;
  }
  const { injectionID } = integral;
  const value = rs.template.injections[injectionID];
  rs.attributes[injectionID] = {
    kind: "ATTRIBUTE",
    params: {
      references: rs.references,
      node,
      attribute,
      value,
    },
  };
  hooks.setAttribute({
    references: rs.references,
    node,
    attribute,
    value,
  });
};
const buildRender = ({ hooks, template, integrals }) => {
  const rs = {
    template,
    attributes: {},
    references: {},
    descendants: {},
    siblings: [],
    lastNodes: [
      undefined,
    ],
    stack: [],
  };
  for (const integral of integrals) {
    if (integral.kind === "NODE" || integral.kind === "SELF_CLOSING_NODE") {
      createNode({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "CLOSE_NODE") {
      closeNode({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "TEXT") {
      createTextNode({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "CHUNK_ARRAY_INJECTION") {
      createChunkArrayInjection({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "EXPLICIT_ATTRIBUTE") {
      appendExplicitAttribute({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "IMPLICIT_ATTRIBUTE") {
      appendImplicitAttribute({
        hooks,
        rs,
        integral,
      });
    }
    if (integral.kind === "INJECTED_ATTRIBUTE") {
      appendInjectedAttribute({
        hooks,
        rs,
        integral,
      });
    }
  }
  return rs;
};
const builds = {};
const buildRenderStructure = (hooks, template) => {
  const cacheable = template.templateArray.join();
  let integrals = builds[cacheable];
  if (integrals === undefined) {
    const skeleton = buildSkeleton(template);
    integrals = buildIntegrals({
      template,
      skeleton,
    });
    builds[cacheable] = integrals;
  }
  const render = buildRender({
    hooks,
    template,
    integrals,
  });
  return render;
};
const getUpdatedSiblings = (rs) => {
  const siblingsDelta = [];
  const siblings = rs.siblings;
  for (const siblingsID in siblings) {
    const siblingArray = siblings[siblingsID];
    for (const siblingID in siblingArray) {
      const sibling = siblingArray[siblingID];
      siblingsDelta.push(sibling);
    }
  }
  return siblingsDelta;
};
const hasTemplateChanged = (rs, template) => {
  const templateLength = template.templateArray.length;
  if (rs.template.templateArray.length !== templateLength) {
    return true;
  }
  let index = 0;
  while (index < templateLength) {
    const sourceStr = rs.template.templateArray[index];
    const targetStr = template.templateArray[index];
    if (sourceStr !== targetStr) {
      return true;
    }
    index += 1;
  }
  return false;
};
const updateAttributes = (hooks, rs, template) => {
  for (const attributesID in rs.attributes) {
    const pastInjection = rs.attributes[attributesID];
    const attributeValue = template.injections[attributesID];
    if (attributeValue === pastInjection.params.value) {
      continue;
    }
    pastInjection.params.value = attributeValue;
    hooks.setAttribute(pastInjection.params);
  }
};
const updateDescendants = ({ hooks, rs, template, chunkParentNode }) => {
  let siblingLevelUpdated = false;
  for (const descenantID in rs.descendants) {
    const pastDescendant = rs.descendants[descenantID];
    const descendant = template.injections[descenantID];
    const text = String(descendant);
    if (pastDescendant.kind === "TEXT" && !Array.isArray(descendant)) {
      if (pastDescendant.params.text === text) {
        continue;
      }
    }
    if (pastDescendant.kind === "TEXT") {
      hooks.removeDescendant(pastDescendant.params.textNode);
    }
    if (pastDescendant.kind === "CHUNK_ARRAY") {
      const { chunkArray } = pastDescendant.params;
      for (const chunkID in chunkArray) {
        chunkArray[chunkID].unmount();
      }
    }
    const { leftNode, parentNode, siblingIndex } = pastDescendant.params;
    const parentDefault = parentNode ?? chunkParentNode;
    if (!siblingLevelUpdated) {
      siblingLevelUpdated = siblingIndex !== undefined;
    }
    if (Array.isArray(descendant)) {
      rs.descendants[descenantID] = {
        kind: "CHUNK_ARRAY",
        params: {
          chunkArray: descendant,
          leftNode,
          parentNode,
          siblingIndex,
        },
      };
      let currLeftNode = leftNode;
      for (const chunkID in descendant) {
        currLeftNode = descendant[chunkID].mount(parentDefault, currLeftNode);
      }
    }
    if (!Array.isArray(descendant)) {
      const textNode = hooks.createTextNode(text);
      rs.descendants[descenantID] = {
        kind: "TEXT",
        params: {
          parentNode: parentDefault,
          leftNode,
          siblingIndex,
          text,
          textNode,
        },
      };
      if (siblingIndex !== undefined) {
        rs.siblings[siblingIndex] = [
          textNode,
        ];
      }
      hooks.insertDescendant({
        parentNode: parentDefault,
        descendant: textNode,
        leftNode,
      });
    }
    if (pastDescendant.kind === "CHUNK_ARRAY") {
      const { chunkArray } = pastDescendant.params;
      for (const chunkID in chunkArray) {
        const chunk = chunkArray[chunkID];
        if (!chunk.effect.mounted) {
          chunk.disconnect();
        }
      }
    }
  }
  return siblingLevelUpdated;
};
const disconnectDescendants = (hooks, rs) => {
  const attributes = rs.attributes;
  for (const attributeID in attributes) {
    const attribute = attributes[attributeID];
    hooks.removeAttribute(attribute.params);
  }
  for (const descendantID in rs.descendants) {
    const descendant = rs.descendants[descendantID];
    if (descendant.kind === "TEXT") {
      hooks.removeDescendant(descendant.params.textNode);
    }
    if (descendant.kind === "CHUNK_ARRAY") {
      const chunkArray = descendant.params.chunkArray;
      for (const chunkID in chunkArray) {
        const chunk = chunkArray[chunkID];
        chunk.unmount();
        chunk.disconnect();
      }
    }
  }
};
class Banger {
  chunk;
  constructor(chunk) {
    this.chunk = chunk;
  }
  bang() {
    this.chunk.bang();
  }
  getReferences() {
    return this.chunk.getReferences();
  }
}
class Chunk {
  parentNode;
  leftNode;
  siblings;
  effect;
  hooks;
  chunker;
  banger;
  rs;
  params;
  state;
  constructor(base) {
    this.banger = new Banger(this);
    this.hooks = base.hooks;
    this.chunker = base.chunker;
    this.params = base.params;
    this.state = this.chunker.connect({
      banger: this.banger,
      params: base.params,
    });
    const template = this.getTemplate();
    this.rs = buildRenderStructure(this.hooks, template);
    this.siblings = getUpdatedSiblings(this.rs);
    this.effect = this.updateEffect(true, false);
  }
  bang() {
    this.update(this.params);
  }
  connect(params) {
    this.setParams(params);
    this.state = this.chunker.connect({
      banger: this.banger,
      params,
    });
    const template1 = this.getTemplate();
    this.rs = buildRenderStructure(this.hooks, template1);
    this.siblings = getUpdatedSiblings(this.rs);
    this.updateEffect(true, false);
    return this.state;
  }
  update(params) {
    this.setParams(params);
    if (!this.effect.connected) {
      this.connect(this.params);
      return;
    }
    const template1 = this.getTemplate();
    if (hasTemplateChanged(this.rs, template1)) {
      this.disconnect();
      this.connect(params);
      return;
    }
    updateAttributes(this.hooks, this.rs, template1);
    const descendantsUpdated = updateDescendants({
      chunkParentNode: this.parentNode,
      hooks: this.hooks,
      rs: this.rs,
      template: template1,
    });
    if (descendantsUpdated) {
      this.siblings = getUpdatedSiblings(this.rs);
    }
  }
  mount(parentNode, leftNode) {
    this.parentNode = parentNode;
    this.leftNode = leftNode;
    let prevSibling;
    let descendant = leftNode;
    for (const siblingID in this.siblings) {
      prevSibling = descendant;
      descendant = this.siblings[siblingID];
      this.hooks.insertDescendant({
        leftNode: prevSibling,
        parentNode,
        descendant,
      });
    }
    this.updateEffect(this.effect.connected, true);
    return descendant;
  }
  unmount() {
    for (const siblingID in this.siblings) {
      const sibling = this.siblings[siblingID];
      this.hooks.removeDescendant(sibling);
    }
    this.parentNode = undefined;
    this.leftNode = undefined;
    this.updateEffect(this.effect.connected, false);
  }
  disconnect() {
    disconnectDescendants(this.hooks, this.rs);
    if (this.state !== undefined) {
      this.chunker?.disconnect({
        state: this.state,
      });
    }
    this.updateEffect(false, this.effect.mounted);
  }
  getSiblings() {
    return this.siblings;
  }
  getReferences() {
    return this.rs.references;
  }
  getEffect() {
    return this.effect;
  }
  setParams(params) {
    this.params = params;
  }
  getTemplate() {
    return this.chunker.update({
      banger: this.banger,
      state: this.state,
      params: this.params,
    });
  }
  updateEffect(connected, mounted) {
    this.effect = {
      timestamp: performance.now(),
      connected,
      mounted,
    };
    return this.effect;
  }
}
const createCustomInterface = (hooks) => {
  const attach = (parentNode, chunkArray) => {
    let leftNode;
    for (const chunkID in chunkArray) {
      const chunk1 = chunkArray[chunkID];
      leftNode = chunk1.mount(parentNode, leftNode);
    }
  };
  const compose = (chunker) => {
    return (params) => {
      return new Chunk({
        hooks,
        chunker,
        params,
      });
    };
  };
  const draw = (templateArray, ...injections) => {
    return {
      templateArray,
      injections,
    };
  };
  return {
    attach,
    compose,
    draw,
  };
};
const createNode1 = (tag) => {
  return document.createElement(tag);
};
const createTextNode1 = (content) => {
  return document.createTextNode(content);
};
const setAttribute = ({ node, attribute, value, references }) => {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  const firstChar = attribute.charAt(0);
  if (firstChar === "*") {
    const trimmedAttribute = attribute.substr(1);
    references[trimmedAttribute] = node;
    return;
  }
  if (firstChar === "@" && value instanceof Function) {
    const trimmedAttribute = attribute.substr(1);
    node.addEventListener(trimmedAttribute, value);
    return;
  }
  if (firstChar === "?") {
    const trimmedAttribute = attribute.substr(1);
    if (value === undefined) {
      node.removeAttribute(trimmedAttribute);
      return;
    }
    node.setAttribute(trimmedAttribute, String(value));
    return;
  }
  node.setAttribute(attribute, String(value));
};
const removeAttribute = ({ node, attribute, value }) => {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  if (attribute.charAt(0) === "@" && value instanceof Function) {
    const trimmedAttribute = attribute.substr(1, attribute.length - 2);
    node.removeEventListener(trimmedAttribute, value);
    return;
  }
  if (attribute.charAt(0) === "?") {
    const trimmedAttribute = attribute.substr(1);
    node.removeAttribute(trimmedAttribute);
    return;
  }
  node.removeAttribute(attribute);
};
const insertDescendant = ({ descendant, leftNode, parentNode }) => {
  if (leftNode === undefined && parentNode?.hasChildNodes()) {
    const firstNode = parentNode.firstChild;
    parentNode.insertBefore(descendant, firstNode);
    return;
  }
  const nextSibling = leftNode?.nextSibling;
  if (nextSibling !== undefined) {
    parentNode?.insertBefore(descendant, nextSibling);
  } else {
    parentNode?.appendChild(descendant);
  }
  if (nextSibling instanceof HTMLElement || nextSibling instanceof Text) {
    return nextSibling;
  }
};
const removeDescendant = (descendant) => {
  const parentNode = descendant.parentNode;
  parentNode?.removeChild(descendant);
  return descendant;
};
const getSibling = (descendant) => {
  const nextSibling = descendant.nextSibling;
  if (nextSibling instanceof HTMLElement || nextSibling instanceof Text) {
    return nextSibling;
  }
};
const hooks = {
  createNode: createNode1,
  createTextNode: createTextNode1,
  setAttribute,
  removeAttribute,
  insertDescendant,
  removeDescendant,
  getSibling,
};
const { attach, compose, draw } = createCustomInterface(hooks);
let focusedStylesheet;
const stylesheets = {};
const getStylesheetMap = () => stylesheets;
const getFocusedStylesheet = () => focusedStylesheet;
const getFocusedStyleNode = () => stylesheets[focusedStylesheet]?.styleNode;
const queueStylesheet = (stylesheetName) => {
  focusedStylesheet = stylesheetName;
  if (stylesheets[stylesheetName]) {
    return;
  }
  const styleNode = document.createElement("style");
  document.head.appendChild(styleNode);
  stylesheets[stylesheetName] = {
    elements: [],
    styleNode,
  };
};
const addStylesheet = (element, stylesheetName) => {
  const styleBunch = stylesheets[stylesheetName];
  if (styleBunch === undefined) {
    return;
  }
  for (const styleChunk of styleBunch.elements) {
    if (element === styleChunk.element) {
      return;
    }
  }
  const style = styleBunch.styleNode.cloneNode(true);
  document.head.appendChild(style);
  console.log(style);
  styleBunch.elements.push({
    element,
    style,
  });
  element.appendChild(style);
};
const addStylesheets = (element, ...stylesheetNames) => {
  for (const stylesheetName of stylesheetNames) {
    addStylesheet(element, stylesheetName);
  }
};
const removeStylesheet = (element, stylesheetName) => {
  const stylesheetArray = stylesheets[stylesheetName];
  const elements = stylesheetArray.elements;
  if (stylesheetArray === undefined || elements.length === 0) {
    return;
  }
  let elementFound = false;
  for (const stylesheetChunk of elements) {
    const { style, element: node } = stylesheetChunk;
    if (element === node) {
      elementFound = true;
      node.removeChild(style);
      break;
    }
  }
  if (!elementFound) {
    return;
  }
  let updatedArrays = [];
  for (const stylesheetChunk1 of elements) {
    if (element !== stylesheetChunk1.element) {
      updatedArrays.push(stylesheetChunk1);
    }
  }
  stylesheetArray.elements = updatedArrays;
};
const removeStylesheets = (element, ...stylesheetNames) => {
  for (const stylesheetName of stylesheetNames) {
    removeStylesheet(element, stylesheetName);
  }
};
const appendStyleToStylesheet = (style) => {
  const stylesheetArray = stylesheets[focusedStylesheet];
  if (stylesheetArray === undefined) {
    return;
  }
  const index = stylesheetArray.styleNode.sheet?.cssRules.length;
  stylesheetArray.styleNode.sheet?.insertRule(style, index);
  for (const stylesheetChunk of stylesheetArray.elements) {
    stylesheetChunk.style.sheet?.insertRule(style, index);
  }
};
let prefix = "";
const optimist = Math.floor(Math.random() * 4096).toString(16);
const setPrefix = (updatedPrefix) => {
  prefix = updatedPrefix;
};
const getID = () => {
  const stylesheetName = getFocusedStylesheet();
  const stylesheet = getFocusedStyleNode();
  const stub = stylesheet?.sheet?.cssRules.length.toString(16);
  const uniqueID = `_${prefix}${stylesheetName}_${stub}_${optimist}`;
  return uniqueID;
};
const getTemplateAsStr = (templateArray, injections) => {
  const styleIntegrals = [];
  const templateLength = templateArray.length;
  let index = 0;
  while (index < templateLength) {
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
const style = (templateArray, ...injections) => {
  const id = getID();
  const template1 = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${id} {${template1}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const keyframe = (templateArray, ...injections) => {
  const id = getID();
  const template1 = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@keyframes _${id} {${template1}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template1 = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${id}:${selector} {${template1}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getAttributeSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template1 = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${getID()}[${selector}] {${template1}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getMediaQuery = ({ mediaQuery, templateArray, injections }) => {
  const id = getID();
  const template1 = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@media ${mediaQuery} {\n    .${id} {${template1}}\n  }`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const createSelector = (selector) => {
  return (templateArray, ...injections) =>
    getSelector({
      injections,
      selector,
      templateArray,
    });
};
const createAttributeSelector = (selector) => {
  return (templateArray, ...injections) =>
    getAttributeSelector({
      injections,
      selector,
      templateArray,
    });
};
const createMediaQuery = (mediaQuery) => {
  return (templateArray, ...injections) =>
    getMediaQuery({
      injections,
      mediaQuery,
      templateArray,
    });
};
queueStylesheet("document");
const bluebox = style
  `\n	background-color: blue;\n	color: white;\n	padding: 4px 8px;\n`;
console.log(getStylesheetMap());
addStylesheet(document.head, "document");
console.log(getStylesheetMap());
const introDemo = compose({
  connect: () => {
  },
  update: () => {
    return draw
      `\n      <section id="parsley-dom">\n        <h1 class="${bluebox}">SHEETCAKE</h1>\n        <h2>Quick Start</h2>\n        <p>Brian Taylor Vann</p>\n      </section>\n    `;
  },
  disconnect: () => {
  },
});
const introDemoChunk = introDemo();
const demoContent = [
  introDemoChunk,
];
const mainElement = document.querySelector("main");
if (mainElement !== null) {
  attach(mainElement, demoContent);
}
