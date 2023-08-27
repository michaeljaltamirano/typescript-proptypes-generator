"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var _ = __importStar(require("lodash"));
var path = __importStar(require("path"));
var injector = __importStar(require("./injector"));
var configure = __importStar(require("./config"));
var parser = __importStar(require("./parser"));
var prettier = __importStar(require("prettier"));
var glob_1 = __importDefault(require("glob"));
var util_1 = require("util");
var glob = util_1.promisify(glob_1.default);
function generate(_a) {
    var tsConfigPath = _a.tsConfig, prettierConfigPath = _a.prettierConfig, inputPattern = _a.inputPattern, outputDir = _a.outputDir, _b = _a.verbose, verbose = _b === void 0 ? false : _b;
    return __awaiter(this, void 0, void 0, function () {
        var inputPaths, absoluteTsConfigPath, absolutePrettierConfigPath, absoluteInputPatterns, absoluteOutputDir, tsconfig, prettierConfig, allFiles, files, program, promises;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputPaths = _.isString(inputPattern) ? [inputPattern] : inputPattern;
                    absoluteTsConfigPath = configure.getAbsolutePath(tsConfigPath);
                    absolutePrettierConfigPath = prettierConfigPath ? configure.getAbsolutePath(prettierConfigPath) : null;
                    absoluteInputPatterns = inputPaths.map(configure.getAbsolutePath);
                    absoluteOutputDir = outputDir && configure.getAbsolutePath(outputDir);
                    tsconfig = configure.loadTSConfig(tsConfigPath);
                    prettierConfig = absolutePrettierConfigPath ? configure.loadPrettierConfig(absolutePrettierConfigPath) : null;
                    return [4 /*yield*/, Promise.all(absoluteInputPatterns.map(function (absoluteInputPattern) {
                            return glob(absoluteInputPattern, {
                                absolute: true,
                            });
                        }))];
                case 1:
                    allFiles = _c.sent();
                    files = _.compact(_.flatten(allFiles));
                    program = parser.createProgram(files, tsconfig);
                    promises = files.map(function (inputFilePath) { return __awaiter(_this, void 0, void 0, function () {
                        var inputFileExt, outputFileName, outputFilePath_1, outputFilePath;
                        return __generator(this, function (_a) {
                            inputFileExt = path.extname(inputFilePath);
                            if (absoluteOutputDir) {
                                outputFileName = path.basename(inputFilePath).replace(inputFileExt, '.js');
                                outputFilePath_1 = path.resolve(absoluteOutputDir, outputFileName);
                                return [2 /*return*/, generateProptypesForFile(inputFilePath, outputFilePath_1, prettierConfig, program, { verbose: verbose })];
                            }
                            outputFilePath = inputFilePath.replace(inputFileExt, '.js');
                            return [2 /*return*/, generateProptypesForFile(inputFilePath, outputFilePath, prettierConfig, program, { verbose: verbose })];
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = generate;
function generateProptypesForFile(inputFilePath, outputFilePath, prettierConfig, program, options) {
    return __awaiter(this, void 0, void 0, function () {
        var proptypes, result, prettified;
        return __generator(this, function (_a) {
            proptypes = parser.parseFromProgram(inputFilePath, program, options);
            result = injector.inject(inputFilePath, outputFilePath, proptypes);
            if (!result) {
                throw new Error("Failed to generate prop types for " + inputFilePath);
            }
            if (prettierConfig) {
                prettified = prettier.format(result, __assign(__assign({}, prettierConfig), { filepath: outputFilePath }));
                return [2 /*return*/, fs_extra_1.default.outputFile(outputFilePath, prettified)];
            }
            return [2 /*return*/, fs_extra_1.default.outputFile(outputFilePath, result)];
        });
    });
}
//# sourceMappingURL=index.js.map