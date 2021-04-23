### 流程
1. npm init初始化
2. 配置babel.config.js指定babel工作方式，presets指预设环境，plugins指使用的插件
3. 新建main.js，写入要转换的箭头函数和promise
4. 安装对应的资源包 npm install --save-dev @babel/cli @babel/core @babel/preset-env
5. 执行命令使用babel, npx babel main.js -o compiled.js,发现promise函数没有被转换
   --> 因为Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。
   --> 引入polyfill写入API供使用(缺点是体积大，加载慢)
6.新建index.html，引入polyfill.js和编译后的compiled.js,IE9上也能成功运行了。

### 说明
Babel7的npm包都是放在babel域下的，即在安装npm包的时候，我们是安装@babel/这种方式，例如@babel/cli、@babel/core等。而在Babel6，我们安装的包名是babel-cli，babel-core等。其实它们本质是一样的，都是Babel官方的cli命令行工具和core核心包，而且功能是一样的，只是名称版本变化了一下而已。在平时开发和学习的过程中，碰到'@babel/'和'babel-'应该下意识认识到他俩原本是一个包，只是版本不一样而已。