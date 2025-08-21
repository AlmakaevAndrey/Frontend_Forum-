import webpack from 'webpack';
import { buildWebpack } from "./config/buildWebpack";
import { BuildMode, BuildPaths } from './config/types/types';
import path from 'node:path';
import { platform } from 'node:os';


interface EnvVariables {
  analyzer?: boolean;
  mode?: BuildMode;
  port?: number;
  platform?: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  }
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
}