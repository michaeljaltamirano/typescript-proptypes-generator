import { Node } from '../nodes/baseNodes';
declare type ElementType = 'element' | 'node' | 'elementType';
interface ElementNode extends Node {
    elementType: ElementType;
}
export declare function elementNode(elementType: ElementType): ElementNode;
export declare function isElementNode(node: Node): node is ElementNode;
export {};
