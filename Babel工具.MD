### @babel/core
@babel/core是我们使用Bable进行转码的核心npm包，我们使用的babel-cli、babel-node都依赖这个包，因此我们在前端开发的时候，都需要安装这个包。
在我们的工程目录里，执行下面的命令，安装@babel/core。

    npm install --save-dev @babel/core

参考5.@babel右斜杠core底层调用过程,我们可以发现  @babel/core.transform('要转换的代码','配置项'),就能实现代码的编译了。
@babel/core.transform也可以有第3个参数，第3个参数是一个回调函数，用来对转码后的对象进行进一步处理。@babel/core除了transform这个API，还有transformSync、transformAsync和transformFile等同步异步以及对文件进行转码的API，这里就不展开讲了，用法和上面的transform大同小异。

### @babel/cli
@babel/cli是babel的一个脚手架，也是一个npm包，安装了它之后，我们就可以在命令行里使用命令进行转码了。
执行下面的命令可以进行全局安装

    npm install --global @babel/cli

执行下面的命令可以进行项目本地安装

    npm install --save-dev @babel/cli

提醒：转码前不要忘记写Babel配置文件，以及安装@babel/core。

    # @babel/cli如果是全局安装的
    babel a.js -o b.js

    # @babel/cli如果是本地安装的
    npx babel a.js -o b.js

将转译后的代码输出到Node.js的标准输出流

    npx babel a.js

将转译后的代码写入到一个文件（上方刚使用过）

    npx babel a.js -o b.js
    //  o是--out-file的简写
    npx babel a.js --out-file b.js

转译整个文件夹目录

    npx babel input -d output
    // -d是--out-dir的简写
    npx babel input --out-dir output

### @babel/node
@babel/node在真正做前端项目开发的时候，是用不到的。该工具执行的时候需要占用大量内存空间，Babel官方不建议在生产环境使用该工具。因此若不是想深入研究该工具，下面的内容可以跳过。
@babel/node其实和node的功能非常接近，@babel/node的优点是在执行命令的时候可以配置Babel的编译配置项。如果遇到node.js不支持的ES6语法，我们通过@babel/node就可以完成。
在Babel6版本的时候，@babel/node这个工具是 @babel/cli附带的，所以只要安装了@babel/cli ，就可以直接使用 babel/node。但Babel7里，我们需要单独安装

    npm install --save-dev @babel/node

然后我们就可以用@babel/node的babel-node命令来运行js文件。
提醒：不要忘记写Babel配置文件，以及安装core。

    var promise = Promise.resolve('ok')
    console.log(promise)

执行

    npx babel-node a.js //  可以看到命令行输出了promise实例。

@babel/node也可以像node那样进入REPL环境。在命令行下执行下面的命令进入REPL环境

    npx babel-node

然后在REPL交互环境输入下面的内容

    > (x => x + 10)(5)  
    //  注意，>是交互环境提示符，不需要我们输入。
    //  可以看到输出结果15。

### @babel/register
@babel/register这个工具在我们平时的前端工程开发过程中也是用不到的。但若是想开发某些特殊的包，你可能会需要它。
@babel/register只有一个功能，就是重写node的require方法。
@babel/register在底层改写了node的require方法，在代码里引入@babel/register模块后，所有通过require引入并且以.es6, .es, .jsx 和 .js为后缀名的模块都会经过babel的转译。

### babel-loader
babel-loader是用于webpack的一个loader，以便webpack在构建的时候用Babel对JS代码进行转译，这样我们就不用再通过命令行手动转译了。我们在配置该loader的时候需要先安装它：

    npm install babel-loader

在webpack配置文件中，我们把babel-loader添加到module的loaders列表中：

    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-env']
                }
            }
            }
        ]
    }

在这里，我们通过options属性给babel-loader传递预设和插件等Babel配置项。我们也可以省略这个options，这个时候babel-loader会去读取默认的Babel配置文件，也就是.babelrc，.babelrc.js，babel.config.js等。在现在的前端开发中，建议通过配置文件来传递这些配置项。