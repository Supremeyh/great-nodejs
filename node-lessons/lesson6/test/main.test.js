// 在 test/main.test.js 中引用我们的 main.js，并开始一个简单的测试。
var main = require('../main')
var should = require('should')

// describe (moduleName, testDetails),要测试的模块， describe是可以嵌套的， module_name 是可以随便取的
describe('test/main.test.js', function(){
    // it (info, function) 具体的测试语句会放在it的回调函数里。一般来说info字符串会写期望的正确输出的简要一句话文字说明。
    // 当failed的时候控制台就会把详细信息打印出来，表示该期望的info内容没有被满足。一个it对应一个实际的test case

    it('should equal 0 when n ===0', function(){
        main.fibonacci(0).should.equal(0)
    })
    it('should equal 1 when n ===1', function(){
        main.fibonacci(1).should.equal(1)
    })
    it('should equal 55 when n === 10',function(){
        main.fibonacci(10).should.equal(55)
    })
    it('should throw when n>10',function(){
        (function(){main.fibonacci(11)}).should.throw('n should <= 10')
    })
    it('should throw when n<0',function(){
        (function(){main.fibonacci(-1)}).should.throw('n should >= 0')
    })
    it('should throw when n is not a Number',function(){
        (function(){main.fibonacci('嘿嘿')}).should.throw('n should be a Number')
    })
})

// 写完后，在lesson目录下，执行mocha