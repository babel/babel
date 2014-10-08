ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis publish bench

clean:
	rm -rf coverage templates.json

test:
	$(MOCHA_CMD)

bench:
	node node_modules/matcha/bin/_matcha

test-cov:
	make clean
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --

test-travis:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --report lcovonly -- --reporter spec
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

publish:
	make clean
	node bin/cache-templates
	npm publish
	make clean
