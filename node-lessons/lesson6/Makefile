# 用特定版本的 mocha，来跑项目的测试代码。命令行执行 ./node_modules/.bin/mocha （.bin/放着我们所有依赖自带的那些可执行文件）
# 引入 Makefile，让 Makefile 帮我们记住复杂的配置。

test: 
	./node_modules/.bin/mocha

cov test-cov:
	  ./node_modules/.bin/istanbul cover _mocha

.PHONY: test cov test-cov


# 这时，我们只需要调用 make test 或者 make cov，就可以跑我们相应的测试了。

