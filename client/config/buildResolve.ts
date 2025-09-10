import { Configuration } from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildResolve(option: BuildOptions): Configuration['resolve'] {
  return {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': option.paths.src,
      }
      // fullySpecified: false 
    }
}