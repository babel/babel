ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
JSHINT_CMD = node_modules/jshint/bin/jshint
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov test-travis test-browser publish bench build

clean:
	rm -rf coverage templates.json test/tmp dist

bench:
	npm install es6-transpiler traceur esnext es6now jstransform
	node node_modules/matcha/bin/_matcha

test:
	$(JSHINT_CMD) lib
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
	test -n "`which open`" && open test/browser.html

build:
	mkdir -p dist

	node bin/cache-templates

	browserify lib/6to5/browser.js -s to5 >dist/6to5.js
	uglifyjs dist/6to5.js >dist/6to5.min.js

	rm -rf templates.json

publish:
	git pull --rebase

	make test

	node bin/cache-templates
	test -f templates.json

	make build
	cp dist/6to5.js browser.js

	read -p "Version: "  version; \
  npm version $$version --message "v%s"
	npm publish

	git push --follow-tags

	rm -rf templates.json browser.js
