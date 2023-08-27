"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefinedNode = exports.undefinedNode = void 0;
var typeString = 'UndefinedNode';
function undefinedNode() {
    return {
        type: typeString,
    };
}
exports.undefinedNode = undefinedNode;
function isUndefinedNode(node) {
    return node.type === typeString;
}
exports.isUndefinedNode = isUndefinedNode;
//# sourceMappingURL=undefined.js.map