"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnionNode = exports.unionNode = void 0;
const typeString = 'UnionNode';
function unionNode(types) {
    const flatTypes = [];
    flattenTypes(types);
    function flattenTypes(nodes) {
        nodes.forEach((x) => {
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