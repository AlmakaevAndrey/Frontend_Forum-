import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { ModuleOptions, runtime } from 'webpack';
import { BuildOptions } from './types/types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(option: BuildOptions): ModuleOptions['rules'] {
  const isDev = option.mode === 'development';

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base:64:8]',
      },
    },
  };

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    // порядок имеет значение
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // обычные CSS (не модули) для библиотек типа React Quill
  const cssLoader = {
    test: /\.css$/i,
    exclude: /\.module\.css$/i, // чтобы не конфликтовало с CSS Modules
    use: ['style-loader', 'css-loader'],
  };

  const tsLoader = {
    // ts-loader умеет работать с jsx
    // Eсли б мы не использовали тайпскрипт: нужен был бы babel-loader
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  };

  const babelLoader = buildBabelLoader(option);

  return [
    scssLoader,
    babelLoader,
    cssLoader,
    // tsLoader,
    assetsLoader,
    svgLoader,
  ];
}
