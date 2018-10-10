Mongodb与Mongoose

了解 mongodb (http://www.mongodb.org/ )
学习 mongoose 的使用 (http://mongoosejs.com/ )

nosql: hbase 是存海量数据的,单索引，二级索引需自己实现;redis 用来做缓临时数据key-value；mongodb无数据结构限制,完全的索引支持；  couchdb 则试图取代一些使用 mysql 的场景。

MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++
即开源、文档型、nosql。

在 sql 中，数据层级是：数据库（db） -> 表（table） -> 记录（record）-> 字段；
在 mongodb中，数据层级是：数据库 -> collection -> document -> 字段。
使用 mongodb 时，一定要思考的两点就是：表 join 到底要不要，事务支持到底要不要。

安装问题：
自动下载安装mongodb
brew install mongodb 
启动mongodb服务
brew services start mongodb

验证：
mongo
show dbs
use test
show collections
db.mymodels.find()