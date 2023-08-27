import { Node } from './baseNodes';
export interface PropTypeNode extends Node {
    name: string;
    jsDoc?: string;
    propType: Node;
}
export declare function propTypeNode(name: string, jsDoc: string | undefined, propType: Node): PropTypeNode;
export declare function isPropTypeNode(node: Node): node is PropTypeNode;
