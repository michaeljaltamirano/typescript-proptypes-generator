"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnionNode = exports.unionNode = void 0;
var typeString = 'UnionNode';
function unionNode(types) {
    var flatTypes = [];
    flattenTypes(types);
    function flattenTypes(nodes) {
        nodes.forEach(function (x) {
            if (isUnionNode(x)) {
                flattenTypes(x.types);
            }
            else {
                flatTypes.push(x);
            }
        });
    }
    return {
        type: typeString,
        types: flatTypes,
    };
}
exports.unionNode = unionNode;
function isUnionNode(node) {
    return node.type === typeString;
}
exports.isUnionNode = isUnionNode;
//# sourceMappingURL=union.js.map