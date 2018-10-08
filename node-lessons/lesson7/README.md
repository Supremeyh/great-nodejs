目标：浏览器端测试：mocha，chai，phantomjs

定义fibonacci函数

学习使用测试框架 mocha 进行前端测试 : http://mochajs.org/
了解全栈的断言库 chai: http://chaijs.com/
了解 headless 浏览器 phantomjs: http://phantomjs.org/

搭建一个测试原型，用 mocha 自带的脚手架可以自动生成：
cd vendor            # 进入我们的项目文件夹
npm i -g mocha       # 安装全局的 mocha 命令行工具
mocha init .         # 生成脚手架