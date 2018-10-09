js最佳实践

一、JavaScript 语言精粹

二、JavaScript 之美， http://fxck.it/post/72326363595，http://fxck.it/post/73513189448
1、0 是个 Number。在 JS 中，没有 int 和 float 之分，数值类型只有一个，就是 Number。
2、JS 中，Hash 即 Object，Object 即 Hash，这两者是不分的。
3、[] 比 new Array() 效率要高
4、JS 中，记住一句话，可以不吃亏：无论黑数据，白数据，脏数据，干净数据，能被 JSON.stringify 的，就是好数据。
恰好，无论 Number, String, Hash, Array 以何种方式组合，都能被完美地 JSON.stringify。所以在 JS 中，我们很多时候不去创建什么类啊，不去搞什么面向原型编程啊。在需要管理同质化数据时，一个 Array 包裹他们；在需要管理非同质数据的 key-value 结构时，一个 Object 字面量包裹他们。
5、异步控制，Async、EventProxy
Async 就像一只大手，掌控着局面；EventProxy 是个通讯兵，随叫随到为您服务。Async 插入式地在控制，EventProxy 悠哉地呼叫闭包之外。
用了 Async，代码稍显局促；用 EventProxy 的话，战线可以随意拉长。还记得 if 和 goto 之争吗？没错，Async 是 if，EventProxy 是 goto。两者虽能实现同样逻辑，但后者需要更深内力。EventProxy 又怎么用呢？在你需要的地方，定义 something.on(‘hehe’, function)。在你高兴时，something.emit(‘hehe’, data)。代码逻辑乱跳。

