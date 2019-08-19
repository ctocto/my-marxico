// https://github.com/arackaf/customize-cra/blob/master/api.md
const path = require('path')
const {
  override,
  useBabelRc,
  useEslintRc,
  addWebpackAlias,
  addLessLoader,
  addWebpackExternals,
} = require('customize-cra')

const addWebpackTarget = target => (config) => {
  config.target = target
  return config
}

module.exports = {
  webpack: override(
    useBabelRc(),
    useEslintRc(),
    addWebpackTarget('electron-renderer'),
    addWebpackExternals({
      hljs: 'window.hljs',
      CodeMirror: 'window.CodeMirror',
    }),
    addLessLoader({
      javascriptEnabled: true,
      noIeCompat: true,
      localIdentName:
        process.env.NODE_ENV === 'development'
          ? '[path][name]__[local]--[hash:base64:5]'
          : '[hash:base64:5]',
    }),
    addWebpackAlias({
      '@assets': path.resolve(__dirname, 'app/assets'),
      '@pages': path.resolve(__dirname, 'app/pages'),
      '@models': path.resolve(__dirname, 'app/models'),
      '@components': path.resolve(__dirname, 'app/components'),
      '@utils': path.resolve(__dirname, 'app/utils'),
      '@common': path.resolve(__dirname, 'app/common'),
      '@services': path.resolve(__dirname, 'app/services'),
    }),
  ),
  paths(paths, env) {
    paths.appIndexJs = path.resolve(__dirname, 'app/index.js')
    paths.appSrc = path.resolve(__dirname, 'app')
    paths.appBuild = path.resolve(__dirname, 'build/renderer')
    return paths
  },
}
