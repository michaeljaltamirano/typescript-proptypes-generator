export interface Config {
    tsConfig: string;
    prettierConfig: string;
    inputPattern: string | string[];
    outputDir?: string;
    verbose?: boolean;
}
export default function generate({ tsConfig: tsConfigPath, prettierConfig: prettierConfigPath, inputPattern, outputDir, verbose }: Config): Promise<void>;
