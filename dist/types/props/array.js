"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayNode = exports.arrayNode = void 0;
var typeString = 'ArrayNode';
function arrayNode(arrayType) {
    return {
        type: typeString,
        arrayType: arrayType,
    };
}
exports.arrayNode = arrayNode;
function isArrayNode(node) {
    return node.type === typeString;
}
exports.isArrayNode = isArrayNode;
//# sourceMappingURL=array.js.map