var express = require('express')


// 编写 fibonacci 函数
var fibonacci = function(n){

    if (n===0) {
        return 0
    }
    if (n===1) {
        return 1
    }

    //先不写或注释掉以下三个条件，测试发现不通过
    if (n<0) {
        // Error里的内容要与main.test.js完全一致
        throw new Error('n should >=0')
    }
    if (n>10) {
        throw new Error('n should <=10')
    }
    // typeof NaN === 'number' 是成立的，所以要判断 NaN
    if (typeof n !=='number'|| isNaN(n)) {
        throw new Error('n should be a Number')
    }


    return fibonacci(n-1) + fibonacci(n-2)
 }

 var app = express()

 app.get('/fib',function(req,res){
    // http 传来的东西默认都是没有类型的，都是 String，所以我们要手动转换类型
     var n = Number(req.query.n)

     try{
        //用 String 做类型转换，是因为直接给个数字给 res.send 的话， 它会当成一个 http 状态码，所以明确给 String
        res.send(String(fibonacci(n)))
     } catch (e){
        // 如果 fibonacci 抛错的话，错误信息会记录在 err 对象的 .message 属性中。
        res.status(500)
            .send(e.message)
     }
    
 })


 module.exports = app //导出多个属性或方法或使用对象构造方法，结合prototype等，就建议使用module.exports = {}
//exports.app = app  如果只是单一属性或方法的话

app.listen(3000,function(){
    console.log('app is listening at port 3000')
})