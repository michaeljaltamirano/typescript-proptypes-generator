"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstanceOfNode = exports.instanceOfNode = void 0;
var typeString = 'InstanceOfNode';
function instanceOfNode(instance) {
    return {
        type: typeString,
        instance: instance,
    };
}
exports.instanceOfNode = instanceOfNode;
function isInstanceOfNode(node) {
    return node.type === typeString;
}
exports.isInstanceOfNode = isInstanceOfNode;
//# sourceMappingURL=instanceOf.js.map