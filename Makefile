ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis publish bench build

clean:
	rm -rf coverage templates.json test/tmp dist

test:
	$(MOCHA_CMD)
	rm -rf test/tmp

bench:
	node node_modules/matcha/bin/_matcha

test-cov:
	rm -rf coverage
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --
	rm -rf test/tmp

test-travis:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --report lcovonly -- --reporter spec
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

build:
	rm -rf dist
	mkdir dist

	node bin/cache-templates

	browserify lib/6to5/transform.js -s to5 >dist/6to5.js
	uglifyjs dist/6to5.js >dist/6to5.min.js

	rm -rf templates.json

publish:
	rm -rf node_modules
	npm install

	node bin/cache-templates
	make test

	test -f templates.json
	npm publish

	# todo - auto-create tag

	rm -rf templates.json
