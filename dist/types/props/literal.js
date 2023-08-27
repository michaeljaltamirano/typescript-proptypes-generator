"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteralNode = exports.literalNode = void 0;
var typeString = 'LiteralNode';
function literalNode(value, jsDoc) {
    return {
        type: typeString,
        value: value,
        jsDoc: jsDoc,
    };
}
exports.literalNode = literalNode;
function isLiteralNode(node) {
    return node.type === typeString;
}
exports.isLiteralNode = isLiteralNode;
//# sourceMappingURL=literal.js.map