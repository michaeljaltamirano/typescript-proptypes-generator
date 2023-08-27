"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnyNode = exports.anyNode = void 0;
var typeString = 'AnyNode';
function anyNode() {
    return {
        type: typeString,
    };
}
exports.anyNode = anyNode;
function isAnyNode(node) {
    return node.type === typeString;
}
exports.isAnyNode = isAnyNode;
//# sourceMappingURL=any.js.map