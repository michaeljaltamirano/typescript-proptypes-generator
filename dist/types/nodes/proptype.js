"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPropTypeNode = exports.propTypeNode = void 0;
var typeString = 'PropTypeNode';
function propTypeNode(name, jsDoc, propType) {
    return {
        type: typeString,
        name: name,
        jsDoc: jsDoc,
        propType: propType,
    };
}
exports.propTypeNode = propTypeNode;
function isPropTypeNode(node) {
    return node.type === typeString;
}
exports.isPropTypeNode = isPropTypeNode;
//# sourceMappingURL=proptype.js.map