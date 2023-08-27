"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElementNode = exports.elementNode = void 0;
var typeString = 'ElementNode';
function elementNode(elementType) {
    return {
        type: typeString,
        elementType: elementType,
    };
}
exports.elementNode = elementNode;
function isElementNode(node) {
    return node.type === typeString;
}
exports.isElementNode = isElementNode;
//# sourceMappingURL=element.js.map