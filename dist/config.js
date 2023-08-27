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
exports.getAbsolutePath = exports.loadPrettierConfig = exports.loadTSConfig = void 0;
const ts = __importStar(require("typescript"));
const prettier_1 = __importDefault(require("prettier"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Loads and parses a `tsconfig` file and returns a `ts.CompilerOptions` object
 * @param tsConfigPath The location for a `tsconfig.json` file
 */
function loadTSConfig(tsConfigPath) {
    const { config, error } = ts.readConfigFile(tsConfigPath, (filePath) => fs_1.default.readFileSync(filePath).toString());
    if (error)
        throw error;
    const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, path_1.default.dirname(tsConfigPath));
    if (errors.length > 0)
        throw errors[0];
    return options;
}
exports.loadTSConfig = loadTSConfig;
async function loadPrettierConfig(prettierConfigPath) {
    return prettier_1.default.resolveConfig(prettierConfigPath);
}
exports.loadPrettierConfig = loadPrettierConfig;
function isString(x) {
    return typeof x === "string";
}
function getAbsolutePath(relativePath) {
    return path_1.default.resolve(process.cwd(), relativePath);
}
exports.getAbsolutePath = getAbsolutePath;
//# sourceMappingURL=config.js.map