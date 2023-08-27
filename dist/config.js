"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePath = exports.loadPrettierConfig = exports.loadTSConfig = void 0;
var ts = __importStar(require("typescript"));
var prettier = __importStar(require("prettier"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * Loads and parses a `tsconfig` file and returns a `ts.CompilerOptions` object
 * @param tsConfigPath The location for a `tsconfig.json` file
 */
function loadTSConfig(tsConfigPath) {
    var _a = ts.readConfigFile(tsConfigPath, function (filePath) {
        return fs_1.default.readFileSync(filePath).toString();
    }), config = _a.config, error = _a.error;
    if (error)
        throw error;
    var _b = ts.parseJsonConfigFileContent(config, ts.sys, path_1.default.dirname(tsConfigPath)), options = _b.options, errors = _b.errors;
    if (errors.length > 0)
        throw errors[0];
    return options;
}
exports.loadTSConfig = loadTSConfig;
function loadPrettierConfig(prettierConfigPath) {
    return prettier.resolveConfig.sync(prettierConfigPath);
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