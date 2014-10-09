ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis publish bench build

clean:
	rm -rf coverage templates.json test/tmp build

test:
	$(MOCHA_CMD)
	rm -rf test/tmp

bench:
	node node_modules/matcha/bin/_matcha

test-cov:
	make clean
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --
	rm -rf test/tmp

test-travis:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --report lcovonly -- --reporter spec
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

build:
	mkdir build
	cd build
	browserify lib/6to5/transform.js >6to5.js
	uglifyjs 6to5.js >6to5.min.js

publish:
	make clean

	rm -rf node_modules
	npm install

	node bin/cache-templates
	make test

	npm publish

	# todo - auto-create tag

	make clean
