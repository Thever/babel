### Babel是啥？
Babel 是一个工具链(js编译器)，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 关于Babel版本
目前前端使用的Babel版本主要为Babel6和Babel7两个版本。
Babel7的npm包都是放在@babel区域下的，Babel6安装的报名大多是babel-cli,babel-core,babel-xxx这样的。
本质上'@babel/x'和'babel-x'是同一个包，只是版本不同罢了。

### Babel配置文件
Babel执行时会寻找配置文件，主要有.babelrc, .babelrc.js, babel.config.js 和 package.json,上述的配置项与作用是相同的，只需要选择其中一种。

    .babelrc
    {
        "presets": ["es2015", "react"],
        "plugins": ["transform-decorators-legacy", "transform-class-properties"]
    }

    babel.config.js和babelrc.js配置是一样的，通过module.exports输出配置项
    module.exports = {
        "presets": ["es2015", "react"],
        "plugins": ["transform-decorators-legacy", "transform-class-properties"]
    }

    package.json中可增加一项babel的值，实现配置
    {
        "name": "demo",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "babel": {
        "presets": ["es2015", "react"],
        "plugins": ["transform-decorators-legacy", "transform-class-properties"]
        }
    }

配置文件主要是配置presets(预设)和plugins(插件)两个组，其他的minified,ignore平常几乎用不到。
推荐使用.js后缀的配置文件，可以用JS做逻辑处理，适应性更强。

  //  这里只是举个例子，实际项目中，我们可以传入环境变量等来做处理
  var year = 2020;
  var presets = [];
  if (year > 2018) {
    presets = ["@babel/env"];
  } else {
    presets = "presets": ["es2015", "es2016", "es2017"],
  }
  module.exports = {
    "presets": presets,
    "plugins": []
  }

### Babel插件和预设
插件是babel插件处理兼容性的工具，预设是插件和其他预设的集合，方便用户进行环境的配置，插件和预设都需要安装才能使用。

    //  常见的preset包
    @babel/preset-env
    @babel/preset-react
    @babel/preset-typescript
    @babel/preset-stage-0
    @babel/preset-stage-1 

### Babel插件和预设的配置
使用插件或预设的默认配置，成员项直接使用字符串表示，写入配置数组就行了

    presets:['@babel/env']

如果要给插件或预设设置参数，那么成员项就不能写成字符串了，而要改写成一个数组。数组的第一项是插件或预设的名称字符串，第二项是个对象，该对象用来设置第一项代表的插件或预设的参数。

    presets: [
        [
            //  自定义属性的插件名称
            '@babel/preset-env',
            //  自定义插件的配置属性
            {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本+
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

plugin与preset可以写短名称，如果插件的npm包名称的前缀为 babel-plugin-，可以省略前缀。例如

    module.exports = {
        "presets": [],
        "plugins": ["babel-plugin-transform-decorators-legacy"]
    }

可以写成短名称

    module.exports = {
        "presets": [],
        "plugins": ["transform-decorators-legacy"]
    }
如果npm包名称的前缀带有npm作用域@，例如@org/babel-plugin-xxx,短名称可以写成@org/xxx。
目前Babel7的官方npm包里绝大部分插件已经升级为@babel/plugin-前缀的，这种情况的短名称比较特殊了，绝大部分可以像babel-plugin-那样省略@babel/plugin-。但babel官方并没有给出明确的说明，所以还是推荐用全称

### preset预设的选择
babel-preset-es2015、babel-preset-es2016、babel-preset-es2017分别是TC39每年发布的进入标准的ES语法的转换器预设，我们在这里称之为年代preset。目前，Babel官方不再推出babel-preset-es2017以后的年代preset了。
babel-preset-stage-0、babel-preset-stage-1、babel-preset-stage-2、babel-preset-stage-3是TC39每年草案阶段的ES语法转换器预设。
从Babel7版本开始，上述的预设都已经不推荐使用了，babel-preset-stage-X因为对开发造成了一些困扰，也不再更新。
babel-preset-latest = babel-preset-es2015 + babel-preset-es2016 + babel-preset-es2017 ==> Bebel6最强集合
@babel/preset-env = babel-preset-latest + 其他增强功能， @babel/preset-env 完全可以替代 babel-preset-latest
在实际开发过程中，除了使用@babel/preset-env对标准的ES6语法转换，我们可能还需要类型检查和react等预设对特定语法转换。这里有三个官方预设可以使用：

    @babel/preset-flow  // 处理flow
    @babel/preset-react // 处理react
    @babel/preset-typescript // 处理typescript

总结起来，Babel官方的preset，我们实际可能会用到的其实就只有4个：

    @babel/preset-env
    @babel/preset-flow
    @babel/preset-react
    @babel/preset-typescript

一般的项目，不使用flow,typescropt,不用react框架，只要配一个'@babel/preset-env'就可以了。

### plugin插件的选择
虽然Babel7官方有90多个插件，不过大半已经整合在@babel/preset-env和@babel/preset-react等预设里了，我们在开发的时候直接使用预设就可以了。
目前比较常用的插件只有@babel/plugin-transform-runtime。

### babel-polyfill
babel-polyfill在Babel7以后名字是@babel/polyfill。polyfill传统上分两类，一类是已构建成JS文件的polyfill.js，另一类是未构建的需要安装npm包@babel/polyfill。因为@babel/polyfill本质是由两个npm包core-js与regenerator-runtime组合而成的，所以在使用层面上还可以再细分为是引入@babel/polyfill本身还是其组合子包。

总体来说，Babel官方的polyfill使用方法主要有如下几种：
直接在html文件引入Babel官方的polyfill.js脚本文件

    index.html html渲染容器
    // 先引入polyfill.js
    <script src="polyfill.js"></script>

    在前端工程的入口文件里引入polyfill.js
    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11
    3.在入口文件a.js中引入polyfill.js
    # a.js
    import './polyfill.js';
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    4.使用webpack进行编译 npx webpack a.js -o b.js
    5.新建html引用b.js
    6.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行

在前端工程的入口文件里引入@babel/polyfill

    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11 @babel/polyfill@7.8.7
    3.在入口文件a.js中引入@babel/polyfill
    # a.js
    import '@babel/polyfill';
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    4.使用webpack进行编译 npx webpack a.js -o b.js
    5.新建html引用b.js
    6.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行
    
在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime

    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11 core-js@3.6.5 regenerator-runtime@0.13.5
    3.在入口文件a.js中引入 core-js 和 regenerator-runtime
    # a.js
    import "core-js/stable";
    import "regenerator-runtime/runtime";
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    4.使用webpack进行编译 npx webpack a.js -o b.js
    5.新建html引用b.js
    6.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行

在前端工程构建工具的配置文件入口项引入polyfill.js

    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11 
    3.撰写webpack.config.js,配置入口文件，引入polyfill.js
    webpack.config.js
    const path = require('path');
    module.exports = {
        entry: ['./polyfill.js', './a.js'],
        output: {
            filename: 'b.js',
            path: path.resolve(__dirname, '')
        },
        mode: 'development'
    };
    4.编写要编译的a.js
    a.js
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    5.使用webpack进行编译 npx webpack a.js -o b.js
    6.新建html引用b.js
    7.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行

在前端工程构建工具的配置文件入口项引入@babel/polyfill

    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11 @babel/polyfill@7.8.7
    3.撰写webpack.config.js,配置入口文件，引入@babel/polyfill
    webpack.config.js
    const path = require('path');
    module.exports = {
        entry: ['@babel/polyfill', './a.js'],
        output: {
            filename: 'b.js',
            path: path.resolve(__dirname, '')
        },
        mode: 'development'
    };
    4.编写要编译的a.js
    a.js
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    5.使用webpack进行编译 npx webpack a.js -o b.js
    6.新建html引用b.js
    7.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行

在前端工程构建工具的配置文件入口项引入core-js/stable与regenerator-runtime/runtime

    1.npm init
    2.npm i webpack@4.43.0 webpack-cli@3.3.11 core-js@3.6.5 regenerator-runtime@0.13.5
    3.撰写webpack.config.js,配置入口文件，引入polyfill.js
    webpack.config.js
    const path = require('path');
    module.exports = {
        entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
        output: {
            filename: 'b.js',
            path: path.resolve(__dirname, '')
        },
        mode: 'development'
    };
    4.编写要编译的a.js
    a.js
    var promise = Promise.resolve('ok');
    console.log(promise);
    promise.then(val => console.log('promise执行成功', val))

    5.使用webpack进行编译 npx webpack a.js -o b.js
    6.新建html引用b.js
    7.在低版本浏览器(我用的是火狐28.0版本)查看编译后的b.js可以正常运行

核心思路：在使用自定义的文件前先映入polyfill, @babel/polyfill 或 core-js/stable + regenerator-runtime/runtime 来提供兼容的api，在运行自己写代码，实现浏览器代码兼容。

### @babel/preset-env
在Babel6时代，这个预设名字是 babel-preset-env，在Babel7之后，改成@babel/preset-env。
对于preset，当我们不需要对其设置参数的时候，其写法是只需要把该preset的名字放入presets对于的数组里即可，例如

    module.exports = {
        presets: ["@babel/env"],
        plugins: []
    }

如果需要对某个preset设置参数，该preset就不能以字符串形式直接放在presets的数组项了。而是应该再包裹一层数组，数组第一项是该preset字符串，数组第二项是该preset的参数对象。如果该preset没有参数需要设置，则数组第二项可以是空对象或者不写第二项。以下几种写法是等价的：
    
    //  不写配置，默认字符串名称
    module.exports = {
        presets: ["@babel/env"],
        plugins: []
    }
    //  数组形式，第二项配置对象为空，相当于使用默认配置
    module.exports = {
        presets: [["@babel/env", {}]],
        plugins: []
    }
    //  数组形式，不写第二项配置对象，使用默认配置
    module.exports = {
        presets: [["@babel/env"]],
        plugins: []
    }

@babel/preset-env相关配置参数
targets,指定兼容的浏览器版本，该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。
该参数项的写法与browserslist是一样的，采用配置的优先级为 balbel配置文件中的presets>package.json中的browserslist>默认配置
一般而言，兼容的浏览器的版本越低，可用的API越少，需要注入的API特征越多，兼容代码的体积也就越大

    module.exports = {
        presets: [["@babel/env", {
        targets: {
            "chrome": "58",
            "ie": "11"
        }
        }]],
        plugins: []
    }

useBuiltIns,这个参数项主要和polyfill的行为有关，项取值可以是"usage" 、 "entry" 或 false。如果该项不进行设置，则取默认值false。
配置为默认值或false,polyfill会被全部引入(注入全部新特征api,体积最大)。
配置值为entry,需要在使用文件引入@babel/polyfill,根据要兼容的浏览器版本引入相关全部的polyfill代码。(按浏览器版本兼容代码，体积较小)
配置值为usage,配置文件不需要引入@babel/polyfill,根据执行代码需要引入相关polyfill代码(按需引入兼容代码，体积最小)

corejs,该参数项的取值可以是2或3，没有设置的时候取默认值为2（还有一种对象proposals取值方法，我们实际用不到，忽略掉即可）。
注意点：
1.这个参数项只有useBuiltIns设置为'usage'或'entry'时，才会生效。
2.取默认值或2的时候，Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）。因为某些新API只有core-js@3里才有，例如数组的flat方法，我们需要使用core-js@3的API模块进行补齐，这个时候我们就把该项设置为3。
3.需要注意的是，corejs取值为2的时候，需要安装并引入core-js@2版本，或者直接安装并引入polyfill也可以。如果corejs取值为3，必须安装并引入core-js@3版本才可以，否则Babel会转换失败并提示：

    `@babel/polyfill` is deprecated. Please, use required parts of `core-js` and `regenerator-runtime/runtime` separately

modules,该项用来设置是否把ES6的模块化语法改成其它模块化语法。这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。
JS常见的模块化语法有两种：（1）ES6的模块法语法用的是import与export；（2）commonjs模块化语法是require与module.exports
参数为auto或不设置的时候，转码前的代码里import都被转码成require了(CMD)
参数设置为false,就不会对ES6模块化进行更改，还是使用import引入模块,可以使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking 等优化措施。

### @babel/runtime 和 @babel/plugin-transform-runtime
Babel转义 = 语法转换(借助preset) + API转换(借助polyfill)
1.对于语法转换：@babel/runtime提供语法转换用的辅助函数，它并不提供转换，只是作为辅助存在。
2.对于API转换： @babel/runtime提供API转换用的辅助函数,作为辅助存在。如果想通过它做转换，将其换为@babel/runtime-corejs3就可完成API转换，此时也无需再借助pollyfill

Babel做语法转换时为了兼容性会声明辅助函数进行调用工作(单纯做语法转换,暂时不用polyfill补齐API)
@babel/runtime 是Babel做语法转换的辅助函数的集成包，方便项目内重复调用，避免重复声明。
@babel/plugin-transform-runtime有三大作用：
1.自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代(自动用@babel/runtime库的辅助函数替换语法转换后的函数声明)；
    
    使用@babel/runtime+@babel/plugin-transform-runtime来自动替换辅助函数,具体配置可以参考代码

2.当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable(核心API替换);

    //  配置详情可以参考代码
    配合@babel/plugin-transform-runtime 需要安装 @babel/runtime-corejs3 或 @babel/runtime-corejs2
    @babel/runtime-corejs3 = @babel/runtime + core-js3的API转换函数
    @babel/runtime-corejs2 = @babel/runtime + core-js2的API转换函数

3.当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime(异步API替换);

    默认regenerator-runtime/runtime  --> API补齐，会有兼容问题
    引入@babel/runtime，使用@babel/runtime/regenerator --> API替换，没有兼容问题
    @babel/plugin-transform-runtime对Generator/async进行API转换功能，默认是开启的，不需要我们设置。

每个转换后的文件上部都会注入这些相同的函数声明，那为何不用webpack一类的打包工具去掉重复的函数声明，而是要单独再引一个辅助函数包？
webpack在构建的时候，是基于模块来做去重工作的。每一个函数声明都是引用类型，在堆内存不同的空间存放，缺少唯一的地址来找到他们。所以webpack本身是做不到把每个文件的相同函数声明去重的。因此我们需要单独的辅助函数包，这样webpack打包的时候会基于模块来做去重工作。


API兼容的方法：API转换 + polyfill补齐API
API转换主要是给开发JS库或npm包等的人用的，我们的前端工程一般仍然使用polyfill补齐API。

为啥？
如果开发JS库和前端工程都用polyfill补齐API，那么不同的polyfill版本会导致库或前端工程处问题,所以开发JS库或npm包等的人会用到API转换功能(内部重写方法调用，不使用公共API)。
我们前端工程开发的时候也是可以使用@babel/plugin-transform-runtime的API转换功能，毕竟没有污染全局环境，不会有任何冲突。@babel/plugin-transform-runtime的默认设置下，就是对generators/async开启了API转换功能。

配合@babel/plugin-transform-runtime 需要安装 @babel/runtime-corejs3 或 @babel/runtime-corejs2
@babel/runtime-corejs3 = @babel/runtime + core-js3的API转换函数
@babel/runtime-corejs2 = @babel/runtime + core-js2的API转换函数

### babel/plugin-transform-runtime的配置项
@babel/plugin-transform-runtime是否要开启某功能，都是在配置项里设置的，某些配置项的设置是需要安装npm包的。
@babel/plugin-transform-runtime在没有设置配置项的时候，其配置项参数取默认值。下面的两个配置作用是等效的。

    {
        "plugins": [
            "@babel/plugin-transform-runtime"
        ]
    }

    // 是上方的默认值
    { 
        "plugins": [
            [
            "@babel/plugin-transform-runtime",
            {
                "helpers": true,
                "corejs": false,
                "regenerator": true,
                "useESModules": false,
                "absoluteRuntime": false,
                "version": "7.0.0-beta.0"
            }
            ]
        ]
    }

@babel/plugin-transform-runtime配置详解:
// 是否引入辅助函数包,默认为true
helpers:Boolean
// 是否启用API替换，默认为true
regenerator:Boolean
// 是否使用@babel/runtime-corejs,false为不使用,2为使用@babel/runtime-corejs2,3为使用@babel/runtime-corejs3
corejs:false,2,3
// 设置是否使用ES6的模块化用法,默认为false,开启后webpack可以做静态分析，实现树摇等优化。
useESModules:Boolean
// 用来自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则，取值是布尔值或字符串。
// 没有特殊需求，我们不需要修改，保持默认false即可。
absoluteRuntime:Boolean or String
// 该项主要是和@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3的版本号有关系，这三个包我们只需要根据需要安装一个。
// 我们把安装的上述之一npm包的版本号设置给version,可以减少打包体积
// 没有严苛的代码优化要求，该项不填取默认值就行了。
version:String(比如'^7.10.4',和你@babel/runtime三个库中选一个使用的版本一样就行)
在Babel6版本，该插件还有两个配置选项polyfill和useBuiltIns，在v7版本已经移除了，大家不需要再使用。

### @babel/plugin-transform-runtime小结
1.要使用@babel/plugin-transform-runtime插件，其实只有一个npm包是必须要装的，那就是它自己@babel/plugin-transform-runtime。
2.对于@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3，我们只需要根据自己的需要安装一个。
3.如果你不需要对core-js做API转换，那就安装@babel/runtime并把corejs配置项设置为false即可。
4.如果你需要用core-js2做API转换，那就安装@babel/runtime-corejs2并把corejs配置项设置为2即可。
5.如果你需要用core-js3做API转换，那就安装@babel/runtime-corejs3并把corejs配置项设置为3即可。

注意点：
1.那regenerator为何默认值是true？我的理解是，实现Generator与async转换API代码较少，而且也需要一些语法转换，所以默认值取了true。我们也可以设为false，不过没必要。
2.在安装@babel/preset-env的时候，其实已经自动安装了@babel/runtime，不过在项目开发的时候，我们一般都会再单独npm install一遍@babel/runtime。