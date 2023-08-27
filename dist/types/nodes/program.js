"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProgramNode = exports.programNode = void 0;
var typeString = 'ProgramNode';
function programNode(body) {
    return {
        type: typeString,
        body: body || [],
    };
}
exports.programNode = programNode;
function isProgramNode(node) {
    return node.type === typeString;
}
exports.isProgramNode = isProgramNode;
//# sourceMappingURL=program.js.map