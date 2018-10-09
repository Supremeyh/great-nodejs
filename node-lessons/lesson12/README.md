
 主题：线上部署：heroku

 目标：学习 heroku 的线上部署(https://www.heroku.com/ )


 要点： 在lesson3基础上增加Procfile文件，来指导heroku启动我们的程序；在app.js，改变app.listen(process.env.PORT || 5000), 以导入流量

 去 https://www.heroku.com/ 申请个账号，然后下载它的工具包 https://toolbelt.heroku.com/ ，然后再在命令行里面，通过 heroku login 来登录。上述步骤完成后，我们进入本目录，执行 heroku create。这时候，heroku 会为我们随机取一个应用名字，并提供一个 git 仓库给我们。接着，往 heroku 这个远端地址推送我们的 master 分支，heroku 会自动检测出我们是 node.js 程序，并安装依赖，然后按照 Procfile 进行启动。push 完成后，在命令键入 heroku open，则 heroku 会自动打开浏览器带我们去到相应的网址。






