import webpack from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildSvgLoader } from './loaders/buildSvgLoader'
import { buildFileLoader } from './loaders/buildFileLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'
import { buildTypescriptLoader } from './loaders/buildTypescriptLoader'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const babelLoader = buildBabelLoader(isDev)
  const svgLoader = buildSvgLoader()
  const fileLoader = buildFileLoader()
  const cssLoader = buildCssLoader(isDev)
  const typescriptLoader = buildTypescriptLoader()

  return [
    fileLoader,
    svgLoader,
    babelLoader,
    typescriptLoader,
    cssLoader
  ]
}
