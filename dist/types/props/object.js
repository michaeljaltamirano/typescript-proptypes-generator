"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectNode = exports.objectNode = void 0;
var typeString = 'ObjectNode';
function objectNode() {
    return {
        type: typeString,
    };
}
exports.objectNode = objectNode;
function isObjectNode(node) {
    return node.type === typeString;
}
exports.isObjectNode = isObjectNode;
//# sourceMappingURL=object.js.map