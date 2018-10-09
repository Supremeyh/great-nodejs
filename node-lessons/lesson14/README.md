js最佳实践

一、JavaScript 语言精粹

二、JavaScript 之美
1、0 是个 Number。在 JS 中，没有 int 和 float 之分，数值类型只有一个，就是 Number。
2、JS 中，Hash 即 Object，Object 即 Hash，这两者是不分的。
3、[] 比 new Array() 效率要高
4、JS 中，记住一句话，可以不吃亏：无论黑数据，白数据，脏数据，干净数据，能被 JSON.stringify 的，就是好数据。
恰好，无论 Number, String, Hash, Array 以何种方式组合，都能被完美地 JSON.stringify。所以在 JS 中，我们很多时候不去创建什么类啊，不去搞什么面向原型编程啊。在需要管理同质化数据时，一个 Array 包裹他们；在需要管理非同质数据的 key-value 结构时，一个 Object 字面量包裹他们。
5、异步控制，Async、EventProxy
Async 就像一只大手，掌控着局面；EventProxy 是个通讯兵，随叫随到为您服务。Async 插入式地在控制，EventProxy 悠哉地呼叫闭包之外。
用了 Async，代码稍显局促；用 EventProxy 的话，战线可以随意拉长。还记得 if 和 goto 之争吗？没错，Async 是 if，EventProxy 是 goto。两者虽能实现同样逻辑，但后者需要更深内力。EventProxy 又怎么用呢？在你需要的地方，定义 something.on(‘hehe’, function)。在你高兴时，something.emit(‘hehe’, data)。代码逻辑乱跳。

三、继承
用 node 官方的 util 库
js 是面向对象的，但是是“基于原型的面向对象”，没有类。没有多重继承，没有接口。没有结构体，没有枚举类型。

四、callback hell。eventproxy 和 async 。
五、数据类型。js 中，用好 Number，String，Array，Object 和 Function 就够了。有时用用 RegExp。
六、控制流和基本运算符（C语言）、计算型属性（koa）、运算符重载（无）、类型转换(比如.toString，.toJSON，toNumber。js 的隐式类型转换坑多)、相等比较(务必使用 === 三个等于号来比较对象)、嵌套类型（function 构造函数、闭包、字面量哈希，都可以混在一起写，多少层都行，无限制）、拓展（当无法接触一个类的源码，又想帮这个类新增方法的时候。操作它的 prototype 就好了。但不推荐！）、函数式编程（js 中，匿名函数非常的方便，有效利用函数式编程的特性可以使人写代码时心情愉悦，如lodash）、泛型（类型都经常忽略还泛型！every parammeter is 泛型 in js）、权限控制、设计模式、构建大型项目（npm）





