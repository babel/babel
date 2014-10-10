ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis test-browser publish bench build

clean:
	rm -rf coverage templates.json test/tmp dist

bench:
	node node_modules/matcha/bin/_matcha

test:
	$(MOCHA_CMD)

test-cov:
	rm -rf coverage
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --

test-travis:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) -- --reporter spec
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

test-browser:
	make build
	node bin/generate-browser-test >dist/6to5-test.js
	test -n "`which open`" && open test/browser/index.html

build:
	mkdir -p dist

	node bin/cache-templates

	browserify lib/6to5/transform.js -s to5 >dist/6to5.js
	uglifyjs dist/6to5.js >dist/6to5.min.js

	rm -rf templates.json

publish:
	if test -n "`git status -s`"; then echo "uncommitted changes"; exit 1; fi

	rm -rf node_modules

	git pull --rebase
	npm install

	node bin/cache-templates
	make test

	test -f templates.json
	npm publish

	git tag "v`6to5 -V`"
	git push --tags

	rm -rf templates.json
