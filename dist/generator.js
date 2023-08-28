"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const t = __importStar(require("./types"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * Generates code from the given node
 * @param node The node to convert to code
 * @param options The options used to control the way the code gets generated
 */
function generate(node, options = {}) {
    const { sortProptypes = true, importedName = 'PropTypes', includeJSDoc = true, shouldInclude, } = options;
    function jsDoc(node) {
        if (!includeJSDoc || !node.jsDoc) {
            return '';
        }
        return `/**\n* ${node.jsDoc.split(/\r?\n/).reduce((prev, curr) => prev + '\n* ' + curr)}\n*/\n`;
    }
    if (Array.isArray(node)) {
        let propTypes = node;
        if (typeof sortProptypes === 'function') {
            propTypes = propTypes.sort(sortProptypes);
        }
        else if (sortProptypes === true) {
            propTypes = propTypes.sort((a, b) => a.name.localeCompare(b.name));
        }
        let filteredNodes = node;
        if (shouldInclude) {
            filteredNodes = filteredNodes.filter((x) => shouldInclude(x));
        }
        return filteredNodes
            .map((prop) => generate(prop, options))
            .reduce((prev, curr) => `${prev}\n${curr}`);
    }
    if (t.isProgramNode(node)) {
        return node.body
            .map((prop) => generate(prop, options))
            .reduce((prev, curr) => `${prev}\n${curr}`);
    }
    if (t.isComponentNode(node)) {
        const comment = options.comment &&
            `// ${options.comment.split(/\r?\n/gm).reduce((prev, curr) => `${prev}\n// ${curr}`)}\n`;
        const name = `${lodash_1.default.snakeCase(node.name).toUpperCase()}_PROPS`;
        return `export const ${name} = {\n${comment ? comment : ''}${generate(node.types, options)}\n}`;
    }
    if (t.isPropTypeNode(node)) {
        let isOptional = false;
        let propType = { ...node.propType };
        if (t.isUnionNode(propType) && propType.types.some(t.isUndefinedNode)) {
            isOptional = true;
            propType.types = propType.types.filter((prop) => !t.isUndefinedNode(prop) && !(t.isLiteralNode(prop) && prop.value === 'null'));
            if (propType.types.length === 1 && t.isLiteralNode(propType.types[0]) === false) {
                propType = propType.types[0];
            }
        }
        return `${jsDoc(node)}"${node.name}": ${generate(propType, options)}${isOptional ? '' : '.isRequired'},`;
    }
    if (t.isInterfaceNode(node)) {
        return `${importedName}.exact({\n${generate(node.types, {
            ...options,
            shouldInclude: undefined,
        })}\n})`;
    }
    if (t.isFunctionNode(node)) {
        return `${importedName}.func`;
    }
    if (t.isStringNode(node)) {
        return `${importedName}.string`;
    }
    if (t.isBooleanNode(node)) {
        return `${importedName}.bool`;
    }
    if (t.isNumericNode(node)) {
        return `${importedName}.number`;
    }
    if (t.isLiteralNode(node)) {
        return `${importedName}.oneOf([${jsDoc(node)}${node.value}])`;
    }
    if (t.isObjectNode(node)) {
        return `${importedName}.object`;
    }
    if (t.isAnyNode(node)) {
        return `${importedName}.any`;
    }
    if (t.isElementNode(node)) {
        return `${importedName}.${node.elementType}`;
    }
    if (t.isInstanceOfNode(node)) {
        return `${importedName}.instanceOf(${node.instance})`;
    }
    if (t.isArrayNode(node)) {
        if (t.isAnyNode(node.arrayType)) {
            return `${importedName}.array`;
        }
        return `${importedName}.arrayOf(${generate(node.arrayType, options)})`;
    }
    if (t.isUnionNode(node)) {
        let [literals, rest] = lodash_1.default.partition(node.types, t.isLiteralNode);
        literals = lodash_1.default.uniqBy(literals, (x) => x.value);
        rest = lodash_1.default.uniqBy(rest, (x) => (t.isInstanceOfNode(x) ? `${x.type}.${x.instance}` : x.type));
        if (lodash_1.default.every(literals, (literal) => lodash_1.default.isString(literal))) {
            literals = literals.sort((a, b) => a.value.localeCompare(b.value));
        }
        else if (lodash_1.default.every(literals, lodash_1.default.isNumber)) {
            literals = literals.sort();
        }
        const nodeToStringName = (obj) => {
            if (t.isInstanceOfNode(obj)) {
                return `${obj.type}.${obj.instance}`;
            }
            else if (t.isInterfaceNode(obj)) {
                // An interface is PropTypes.exact
                // Use `ShapeNode` to get it sorted in the correct order
                return `ShapeNode`;
            }
            return obj.type;
        };
        rest = rest.sort((a, b) => nodeToStringName(a).localeCompare(nodeToStringName(b)));
        if (literals.find((x) => x.value === 'true') && literals.find((x) => x.value === 'false')) {
            rest.push(t.booleanNode());
            literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
        }
        const literalProps = literals.length !== 0
            ? `${importedName}.oneOf([${literals
                .map((x) => `${jsDoc(x)}${x.value}`)
                .reduce((prev, curr) => `${prev},${curr}`)}])`
            : '';
        if (rest.length === 0) {
            return literalProps;
        }
        if (literals.length === 0 && rest.length === 1) {
            return generate(rest[0], options);
        }
        return `${importedName}.oneOfType([${literalProps ? literalProps + ', ' : ''}${rest
            .map((x) => generate(x, options))
            .reduce((prev, curr) => `${prev},${curr}`)}])`;
    }
    throw new Error(`Nothing to handle node of type "${node.type}"`);
}
exports.generate = generate;
//# sourceMappingURL=generator.js.map