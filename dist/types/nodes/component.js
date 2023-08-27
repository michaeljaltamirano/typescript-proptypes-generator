"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComponentNode = exports.componentNode = void 0;
var typeString = 'ComponentNode';
function componentNode(name, types) {
    return {
        type: typeString,
        name: name,
        types: types || [],
    };
}
exports.componentNode = componentNode;
function isComponentNode(node) {
    return node.type === typeString;
}
exports.isComponentNode = isComponentNode;
//# sourceMappingURL=component.js.map