### Babel是啥？
Babel是一个工具集，主要用于将ES6版本的JavaScript代码转为ES5等向后兼容的JS代码，从而可以运行在低版本浏览器或其它环境中，主要工作有语法转换和补齐API。

### Babel使用的基础包有哪些？
@babel/cli @babel/core @babel/preset-env

### 如何Babel版本？
1.进入到package.json查看
2.@babel/core这种右斜杠分类的是babel7版本，babel-core这种用短杠分割的是babel6版本。

### Babel 配置文件怎么写？
Babel的配置文件是Babel执行时默认会在当前目录寻找的文件，主要有.babelrc，.babelrc.js，babel.config.js和package.json。它们的配置项都是相同，作用也是一样的，只需要选择其中一种。
Babel文件主要配置presets和plugins来指定要兼容的要求与使用的插件

### Babel 配置文件presets(预设)和plugins(插件)怎么选择？
presets默认选择@babel/preset-env,要兼容flow选择@babel/preset-flow,兼容react框架选择@babel/preset-react,兼容typescript使用@babel/preset-typescript。
常用的插件只有@babel/plugin-transform-runtime。

### polyfill(垫片)如何使用？
//  html渲染容器中引入
直接在html文件引入Babel官方的polyfill.js脚本文件；
//  在前端入口文件引入
在前端工程的入口文件里引入polyfill.js；
在前端工程的入口文件里引入@babel/polyfill；
在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime；
//  在webpack打包入口引入
在前端工程构建工具的配置文件入口项引入polyfill.js；
在前端工程构建工具的配置文件入口项引入@babel/polyfill；
在前端工程构建工具的配置文件入口项引入core-js/stable与regenerator-runtime/runtime；

### @babel/preset-env的使用
1.在babel配置文件中用targets指定要兼容的浏览器目标

    module.exports = {
        presets: [["@babel/env", {
        targets: {
            "chrome": "58",
            "ie": "11"
        }
        }]],
        plugins: []
    }

2.在package.json中设置browserslist属性指定要兼容的浏览器

    "browserslist": [
        "> 1%",
        "not ie <= 8"
    ]

babel配置文件的参数
targets:指定要兼容的浏览器版本
useBuiltIns:
    false(默认值),polyfill全部引入
    entry,根据浏览器要求全部引入
    usage,根据浏览器要求+实际代码引入
corejs:
    2或3,指定使用的core.js版本，默认是2
modules：
    取值可以为"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。
    在该参数项值是'auto'或不设置的时候，会发现我们转码前的代码里import都被转码成require了。
    如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块，可以做静态分析代码优化。

### 插件babel/plugin-transform-runtime
1.使用@babel/runtime+@babel/plugin-transform-runtime来自动替换辅助函数

    //  需要的npm包
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.6",
    "@babel/plugin-transform-runtime": "^7.9.6",
    "@babel/preset-env": "^7.9.6"
    "@babel/runtime": "^7.9.6"

    //  babel配置
    module.exports = {
        presets: ["@babel/env"],
        plugins: ["@babel/plugin-transform-runtime"]
    }

2.@babel/plugin-transform-runtime + @babel/core + @babel/runtime-corejs3实现API替换

    //  需要的npm包
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.6",
    "@babel/plugin-transform-runtime": "^7.9.6",
    "@babel/preset-env": "^7.9.6"
    "@babel/runtime-corejs3": "^7.10.4"

    //  babel配置
    module.exports = {
        presets: ["@babel/env"],
        plugins: [
            ["@babel/plugin-transform-runtime", {
            "corejs": 3
            }]
        ]
    }

3.代码里使用了Generator/async函数，@babel/plugin-transform-runtime + @babel/runtime/regenerator,全局替换regenerator-runtimeruntime

    //  需要的npm包
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.6",
    "@babel/plugin-transform-runtime": "^7.9.6",
    "@babel/preset-env": "^7.9.6"
    "@babel/runtime": "^7.13.17"

    //  babel配置
    module.exports = {
        presets: ["@babel/env"],
        plugins: [
            ["@babel/plugin-transform-runtime", {}]
        ]
    }

### @babel/core
@babel/core是我们使用Bable进行转码的核心npm包，我们使用的babel-cli、babel-node都依赖这个包，因此我们在前端开发的时候，都需要安装这个包。

### @babel/cli
@babel/cli是babel的一个脚手架，也是一个npm包，安装了它之后，我们就可以在命令行里使用命令进行转码了。

### @babel/node
@babel/node在真正做前端项目开发的时候，是用不到的，提供node不提供的ES6语法api，用于开发测试。

### @babel/register
@babel/register这个工具在我们平时的前端工程开发过程中也是用不到的。但若是想开发某些特殊的包，能提供重写node的require方法。

### babel-loader
babel 兼容 webpack 的一个loader,以便webpack在构建的时候用Babel对JS代码进行转译

### webpack中使用babel-loader做js兼容的配置

    //  使用的库
    "@babel/core": "^7.8.4",
    "@babel/preset-env": "^7.8.4",
    "babel": "^6.23.0",
    "babel-loader": "^8.0.6",
    "core-js": "^3.6.4",
    "html-webpack-plugin": "^3.2.0",    //  这个库是用来处理html模板容器的，可以不用安装
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11"

    // 在webpack的配置文件中，对module/rules设置匹配处理规则
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
            [
                '@babel/preset-env',
                {
                    // 按需加载
                    useBuiltIns: 'usage',
                    // 指定core-js版本
                    corejs: {
                    version: 3
                    },
                    // 指定兼容性做到哪个版本浏览器
                    targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                    }
                }
            ]
        ]
        }
    }