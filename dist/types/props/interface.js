"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInterfaceNode = exports.interfaceNode = void 0;
var typeString = 'InterfaceNode';
function interfaceNode(types) {
    return {
        type: typeString,
        types: types || [],
    };
}
exports.interfaceNode = interfaceNode;
function isInterfaceNode(node) {
    return node.type === typeString;
}
exports.isInterfaceNode = isInterfaceNode;
//# sourceMappingURL=interface.js.map