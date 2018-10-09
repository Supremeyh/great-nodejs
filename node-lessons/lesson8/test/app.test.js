var app = require('../app')

var supertest = require('supertest')
var request = supertest(app)
// cookie 持久化,  获取一个 agent 对象
// var agent = supertest.agent(app)
// 或者，在发起请求时，调用 .set('Cookie', 'a cookie string') 这样的方式。
var userCookie;

var should = require('should')

describe('test/app.test.js',function(){
    it('should return 55 when n is 10', function(done){
        // .query 方法用来传 querystring，.send 方法用来传 body。它们都可以传 Object 对象进去, 在这里，我们等于访问的是 /fib?n=10
        request.get('/fib')
            .query({n:10})
            .end(function(err, res){
                userCookie = res.headers['set-cookie'] //获取cookie
                // 由于 http 返回的是 String，所以我要传入 '55'。
                res.text.should.equal('55')
                done(err)
            })
    })


    //抽象出来了一个 testFib 方法, 各种边界条件都进行测试，由于它们的代码雷同
    var testFib = function(n,statusCode,expect,done){
        request.get('/fib')
            .query({n:n})
            .expect(statusCode)
            // .set('cookie', userCookie) // 设置cookie 
            .end(function(err,res){
                res.text.should.equal(expect)
                done(err)
            })
    }

    it('should return 0 when n===0',function(done){
        testFib(0,200,'0',done)
    })
    it('should return 1 when n===1',function(done){
        testFib(1,200,'1',done)
    })
    it('should return 55 when n===10',function(done){
        testFib(10,200,'55',done)
    })
    it('should throw when n>10',function(done){
        testFib(11,500,'n should <=10',done)
    })
    it('should throw when n<0',function(done){
        testFib(-1,500,'n should >=0',done)
    })
    it('should throw when n is not Number',function(done){
        testFib('heihei',500,'n should be a Number',done)
    })
    it('should status 500 when error',function(done){
        request.get('/fib')
            .query({n:100})
            .expect(500)
            .end(function(err,res){
                done(err)
            })
    })


})