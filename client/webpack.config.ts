import webpack from 'webpack';
import path from 'path';
import { buildWebpack } from './config/buildWebpack';
import { BuildMode, BuildPaths } from './config/types/types';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });
interface EnvVariables {
  analyzer?: boolean;
  mode?: BuildMode;
  port?: number;
  platform?: 'mobile' | 'desktop';
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  config.plugins = [
    ...(config.plugins || []),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(
        process.env.REACT_APP_API_URL || 'http://localhost:5000'
      ),
    }),
  ];

  return config;
};
