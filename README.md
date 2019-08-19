# my-marxico [![Build Status](https://travis-ci.org/ctocto/my-marxico.svg?branch=master)](https://travis-ci.org/ctocto/my-marxico) [![Build status](https://ci.appveyor.com/api/projects/status/41gt4n789837ftps?svg=true)](https://ci.appveyor.com/project/Northerner/my-marxico)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[DvaJS](https://dvajs.com/) React and redux based, lightweight and elm-style framework.

### Install
```github
git clone --depth 1 --single-branch --branch master https://github.com/ctocto/my-marxico.git your-project-name
```
And then install the dependencies with npm
```
$ cd your-project-name
$ npm i
$ npm i -g foreman // http://strongloop.github.io/node-foreman/
```
### Starting Development
```
$ npm start
```

### Packaging for Production
To package apps for the local platform:
```
$ npm run dist
```


### QA

#### Unable to resolve path to module '@pages/Home/Home'  import/no-unresolved
https://www.npmjs.com/package/eslint-import-resolver-alias

#### How do I change `src` folder to something else in create-react-app
```js
const path = require('path')
const {
  override,
} = require('customize-cra')

module.exports = {
  paths(paths, env) {
    paths.appIndexJs = path.resolve(__dirname, 'app/index.js')
    paths.appSrc = path.resolve(__dirname, 'app')
    return paths
  },
}
```

#### '@pages/Demo' should be listed in the project's dependencies. Run 'npm i -S @pages/Demo' to add it            import/no-extraneous-dependencies
have no alternative
```
"import/no-extraneous-dependencies": [0]
```

#### Treating warnings as errors because process.env.CI = true.
```
Creating an optimized production build...
Treating warnings as errors because process.env.CI = true.
Most CI servers set it automatically.
Failed to compile.
```
> https://stackoverflow.com/questions/52888214/how-to-set-environment-variable-in-react-js
```
"build": "set \"CI=false\" && react-app-rewired build",
```
or

`.travis.yml`
```
env:
  global:
    - CI=false
```
`.appveyor.yml`
```
install:
  - ps: Install-Product node 12 x64
  - set CI=false
  - npm install
```

#### `electron-builder --publish onTagOrDraft`
`appveyor CI`,`travis CI` No settings required `conditional-releases`

#### `TypeError: fs.existsSync is not a function`
```
  3 | 
  4 | var pathFile = path.join(__dirname, 'path.txt')
  5 | 
> 6 | if (fs.existsSync(pathFile)) {
  7 |   module.exports = path.join(__dirname, fs.readFileSync(pathFile, 'utf-8'))
  8 | } else {
  9 |   throw new Error('Electron failed to install correctly, please delete node_modules/electron and try installing again')

```
https://github.com/electron/electron/issues/9920#issuecomment-508276131

### TODO
* electron 6.0 macOS **Unexpected exit**
  - ✅ update `electron-builder@^21.2.0`
* build main code
  - ✅ `"build-main": "cross-env NODE_ENV=production webpack --config ./configs/webpack.config.main.prod.js --colors"`