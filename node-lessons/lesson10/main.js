/**
 benchmark性能测试

 有一个字符串 var number = '100'，我们要将它转换成 Number 类型的 100。目前有三个选项：+, parseInt, Number请测试哪个方法更快。
 */

 
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite

var numberStr = '1000'

suite
    // add test
    .add('+', function(){
        +numberStr
    })
    .add('parseInt',function(){
        parseInt(numberStr)
    })
    .add('Number',function(){
        Number(numberStr)
    })
    // add listeners
    .on('cycle',function(event){
        console.log(String(event.target))
    })
    .on('complete',function(){
        console.log('Fatest is '+ this.filter('fastest').map('name'))
    })
    // run async
    .run({'async': true})


