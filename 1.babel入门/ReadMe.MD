### 流程
1. npm init初始化
2. 配置babel.config.js指定babel工作方式，presets指预设环境，plugins指使用的插件
3. 新建main.js，写入要转换的箭头函数
4. 安装对应的资源包 npm install --save-dev @babel/cli @babel/core @babel/preset-env
5. 执行命令使用babel, npx babel main.js -o compiled.js
   --> 1.npx是node的运行命令
   --> 2.babel使用babel,默认会按babel.config.js运行，除了babel.config.js，我们也可以选择用.babelrc或.babelrc.js这两种配置文件，还可以直接将配置参数写在package.json
   --> 3.main.js指的是要转换的文件
   --> 4. -o compiled.js 指定输出的文件