var mongoose = require('mongoose')

// 连接数据库
// 格式 mongoose.connect('mongodb://username:password@host:port/database?options...',options);
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true},function(err, res){
        if(err){
            console.log('====unconnect=====')
        } else{
            console.log('=====connected=====')
        }
    })
    
    //检验是否连接成功
    var db = mongoose.connection
    
    db.on('error',function(err){
        console.log('db unconnect '+ err)
        
    })
    db.once('open',function(){
        console.log('db connected')
    })


// Schema主要用于定义MongoDB中集合Collection里文档document的结构　　
// 定义Schema非常简单，指定字段名和类型即可
// 通过mongoose.Schema来调用Schema，然后使用new方法来创建schema对象
var Schema = mongoose.Schema
var mySchema = new Schema({
    name: String,
    num: Number,
    date: {type: Date, default: Date.now}
})

//模型Model是根据Schema编译出的构造器，或者称为类
var MyModel = mongoose.model('MyModel', mySchema)

// 实例化文档document对象, 通过对原型MyModel使用new方法
var doc1 = new MyModel({
    name: 'sea'
})

console.log(doc1.name)

// 文档保存, 必须通过save()方法，才能将创建的文档保存到数据库的集合中，集合名称为模型名称的小写复数版
doc1.save(function(err, doc){
    console.log('doc....', doc)
})
