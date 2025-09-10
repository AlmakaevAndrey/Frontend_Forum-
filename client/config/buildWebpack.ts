import webpack from "webpack"
import { buildDevServer } from "./buildDevServer"
import { buildPlugins } from "./buildPlugins"
import { buildLoaders } from "./buildLoaders"
import { buildResolve } from "./buildResolve"

export function buildWebpack(option: any): webpack.Configuration {
    const { mode, paths } = option;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(option),
        module: {
            rules: buildLoaders(option),
        },
        resolve: buildResolve(option),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(option) : undefined,
    }

}