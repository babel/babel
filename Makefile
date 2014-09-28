ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis publish

clean:
	rm -rf coverage templates.json

test:
	$(MOCHA_CMD)

test-cov:
	make clean
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --

test-travis:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --report lcovonly -- --reporter spec
	cat ./coverage/lcov.info | codeclimate

publish:
	make clean
	node bin/cache-templates
	npm publish
	make clean
