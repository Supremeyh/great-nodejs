/**
 测试用例：mocha，should，istanbul

 test/main.test.js: 对 main 函数进行测试

    学习使用测试框架 mocha : http://mochajs.org/
    学习使用断言库 should : https://github.com/tj/should.js
    学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
    简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

步骤：
    先执行 npm init 创建 package.json； 
    建立我们的 main.js 文件，编写 fibonacci 函数；
    简单实现后，执行node main.js 10 检验； 
    TDD，创建test/main.test.js，写测试用例覆盖所有情况，执行mocha（或./node_modules/.bin/mocha）跑测试，有问题再修补main.js；
    执行istanbul cover _mocha，检查测试率覆盖，打开或执行open coverage/lcov-report/index.html；
    编写Makefile，让其记住复杂的配置，调用make test 或者make cov，就可以跑相应的测试了。
 */

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
        throw new Error('n should >= 0')
    }
    if (n>10) {
        throw new Error('n should <= 10')
    }
    if (typeof n !=='number') {
        throw new Error('n should be a Number')
    }


    return fibonacci(n-1) + fibonacci(n-2)
 }

 //暴露出fibonacci，以便外部引用
 exports.fibonacci = fibonacci


// 如果是直接执行 main.js，则进入此处, 如果 main.js 被其他文件 require，则此处不会执行。
 if(require.main === module) {
    var n = Number(process.argv[2])
    console.log('fibonacci('+ n +') is ',fibonacci(n))
 }