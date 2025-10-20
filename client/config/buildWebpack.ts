import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolve } from './buildResolve';

export function buildWebpack(option: any): webpack.Configuration {
  const { mode, paths } = option;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'assets/[name].[hash][ext][query]',
      path: paths.output,
      clean: true,
      publicPath: '/',
      hashFunction: 'xxhash64',
    },
    plugins: buildPlugins(option),
    module: {
      rules: buildLoaders(option),
    },
    resolve: buildResolve(option),

    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
    },

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(option) : undefined,

    performance: {
      hints: isDev ? false : 'warning',
      maxAssetSize: 1024 * 1024,
      maxEntrypointSize: 1024 * 1024,
    },
  };
}
