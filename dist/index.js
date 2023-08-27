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
const fs_extra_1 = __importDefault(require("fs-extra"));
const _ = __importStar(require("lodash"));
const path = __importStar(require("path"));
const injector = __importStar(require("./injector"));
const configure = __importStar(require("./config"));
const parser = __importStar(require("./parser"));
const prettier = __importStar(require("prettier"));
const glob_1 = require("glob");
async function generate({ tsConfig: tsConfigPath, prettierConfig: prettierConfigPath, inputPattern, outputDir, verbose = false }) {
    const inputPaths = _.isString(inputPattern) ? [inputPattern] : inputPattern;
    // const absoluteTsConfigPath = configure.getAbsolutePath(tsConfigPath);
    const absolutePrettierConfigPath = prettierConfigPath ? configure.getAbsolutePath(prettierConfigPath) : null;
    const absoluteInputPatterns = inputPaths.map(configure.getAbsolutePath);
    const absoluteOutputDir = outputDir && configure.getAbsolutePath(outputDir);
    const tsconfig = configure.loadTSConfig(tsConfigPath);
    const prettierConfig = absolutePrettierConfigPath ? await configure.loadPrettierConfig(absolutePrettierConfigPath) : null;
    const allFiles = await Promise.all(absoluteInputPatterns.map(absoluteInputPattern => {
        return (0, glob_1.glob)(absoluteInputPattern, {
            absolute: true,
        });
    }));
    const files = _.compact(_.flatten(allFiles));
    const program = parser.createProgram(files, tsconfig);
    const promises = files.map(async (inputFilePath) => {
        const { dir, ext, name } = path.parse(inputFilePath);
        if (absoluteOutputDir) {
            const outputFileName = path.basename(inputFilePath).replace(ext, '.ts');
            const outputFilePath = path.resolve(absoluteOutputDir, outputFileName);
            return generateProptypesForFile(inputFilePath, outputFilePath, prettierConfig, program, { verbose });
        }
        const outputFileName = `${dir}/${name}-prop-types.ts`;
        // If no output directory was provided, put generated TS the file adjacent to the input file
        return generateProptypesForFile(inputFilePath, outputFileName, prettierConfig, program, { verbose });
    });
    await Promise.all(promises);
}
exports.default = generate;
async function generateProptypesForFile(inputFilePath, outputFilePath, prettierConfig, program, options) {
    const proptypes = parser.parseFromProgram(inputFilePath, program, options);
    const result = injector.inject(inputFilePath, outputFilePath, proptypes);
    if (!result) {
        throw new Error(`Failed to generate prop types for ${inputFilePath}`);
    }
    if (prettierConfig) {
        const prettified = await prettier.format(result, {
            ...prettierConfig,
            filepath: outputFilePath
        });
        return fs_extra_1.default.outputFile(outputFilePath, prettified);
    }
    return fs_extra_1.default.outputFile(outputFilePath, result);
}
//# sourceMappingURL=index.js.map