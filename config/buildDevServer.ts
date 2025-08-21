import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(option:BuildOptions): DevServerConfiguration {
    return {
          port: option.port ?? 3000,
          open: true,
          // Если раздавать статистику через nginx то нужно делать проксироваение на Index.html
          historyApiFallback: true,
          hot: true,
    }
}