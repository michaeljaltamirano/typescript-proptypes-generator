"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumericNode = exports.numericNode = void 0;
var typeString = 'NumericNode';
function numericNode() {
    return {
        type: typeString,
    };
}
exports.numericNode = numericNode;
function isNumericNode(node) {
    return node.type === typeString;
}
exports.isNumericNode = isNumericNode;
//# sourceMappingURL=numeric.js.map