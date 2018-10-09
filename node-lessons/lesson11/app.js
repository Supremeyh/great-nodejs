/**
 * 作用域与闭包：this，var，(function () {})
 * 
 */

 /**
  * 闭包
  */
 var parent = function(){
     var name = 'parent'
     var age = 50

     var child = function(){
         var name = 'child'
         var childAge = 12
            childAge = 12
         console.log(name,age, childAge)
     }
     child()

    //  console.log(name,age,childAge)
     

 }
 parent()


// 打印五个5出来，而我们预想的结果是打印 0 1 2 3 4. 因为 setTimeout 中的 i 是对外层 i 的引用。当 setTimeout 的代码被解释的时候，
// 运行时只是记录了 i 的引用，而不是值,而当 setTimeout 被触发时，五个 setTimeout 中的 i 同时被取值，由于它们都指向了外层的同一个 i，
// 而那个 i 的值在迭代完成时为 5，所以打印了五次 5。
 for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, 5);
  }

// 为了得到我们预想的结果，我们可以把 i 赋值成一个局部的变量，从而摆脱外层迭代的影响。let 或如下
for (var i = 0; i < 5; i++) {
  (function (index) {
    setTimeout(function () {
      console.log(index);
    }, 5);
  })(i);
}


/**
  * this
  在函数执行时，this 总是指向调用该函数的对象。要判断 this 的指向，其实就是判断 this 所在的函数属于谁。

  this 出现的场景分为四类，简单的说就是：
    有对象就指向调用对象
    没调用对象就指向全局对象
    用new构造就指向新对象
    通过 apply 或 call 或 bind 来改变 this 的所指。

  */

//  1、函数有所属对象时：指向所属对象。函数有所属对象时，通常通过 . 表达式调用，这时 this 自然指向所属对象
console.log('1==========================')
var myObject1 = {value: 1000}
myObject1.getValue = function(){
    console.log(this.getValue) //输出1000
    console.log(this) //输出myObject1本身，即{value: 1000, getValue: [Function]}

    return this.value   
}

console.log(myObject1.getValue()) //1000 , getValue() 属于对象 myObject，并由 myOjbect 进行 . 调用，因此 this 指向对象 myObject。

// 2、函数没有所属对象：指向全局对象
console.log('2==========================')
var myObject2 = {value: 1000} 
myObject2.getValue = function(){
    var foo = function(){
        // foo 函数虽然定义在 getValue 的函数体内，但实际上它既不属于 getValue 也不属于 myObject。foo 并没有被绑定在任何对象上，
        // 所以当调用时，它的 this 指针指向了全局对象 globa
        console.log(this.getValue) //undefined
        console.log(this) //输出全局对象 global
    }
    foo()

    return this.value    
}

console.log(myObject2.getValue())
 
// 3、构造器中的 this：指向新对象
console.log('3==========================')
// js 中，我们通过 new 关键词来调用构造函数，此时 this 会绑定在该新对象上。
var someFunc = function(){
    this.value = 1000
}

var myCreate = new someFunc()
console.log(myCreate.value)

// 4、apply 和 call 调用以及 bind 绑定：指向绑定的对象
console.log('4==========================')
// apply接受两个参数，一个是函数运行的作用域，一个是参数数组(arguments)。call() 方法第一个参数的意义与apply相同，只是参数需要一个个列举出来。
// 简单来说，call 的方式更接近我们平时调用函数，而 apply 需要我们传递 Array 形式的数组给它。它们是可以互相转换的。
var myObject4 = {vaule: 1000}
var foo = function(){
    console.log(this)
}

foo() //global

foo.apply(myObject4) //{vaule: 1000}
foo.apply(myObject4) //{vaule: 1000}

var newFoo = foo.bind(myObject4)
newFoo() //{vaule: 1000}