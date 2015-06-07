MAKEFLAGS = -j1
BROWSERIFY_CMD = node_modules/browserify/bin/cmd.js
ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs
#UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs --mangle sort
MOCHA_CMD = node_modules/mocha/bin/_mocha
BABEL_CMD = node_modules/babel/bin/babel
BROWSERIFY_IGNORE = -i esprima-fb

export NODE_ENV = test

.PHONY: clean test test-cov test-clean test-travis test-simple test-all test-browser test-parser publish build bootstrap publish-core publish-runtime build-core watch-core build-core-test clean-core

build-core: clean-core
	node $(BABEL_CMD) src --out-dir lib --copy-files

build-core-test: clean-core
	node $(BABEL_CMD) src --out-dir lib --copy-files --auxiliary-comment "istanbul ignore next"

watch-core: clean-core
	node $(BABEL_CMD) src --out-dir lib --watch --copy-files

clean-core:
	rm -rf lib

lint:
	eslint src/babel

build:
	mkdir -p dist
	make build-core

	node tools/cache-templates

	node $(BROWSERIFY_CMD) -e lib/babel/polyfill.js >dist/polyfill.js
	node $(UGLIFY_CMD) dist/polyfill.js >dist/polyfill.min.js

	node $(BROWSERIFY_CMD) lib/babel/api/browser.js -s babel $(BROWSERIFY_IGNORE) >dist/browser.js
	node $(UGLIFY_CMD) dist/browser.js >dist/browser.min.js

	node $(BROWSERIFY_CMD) lib/babel/api/node.js --node $(BROWSERIFY_IGNORE) >dist/node.js

	node packages/babel-cli/bin/babel-external-helpers >dist/external-helpers.js
	node $(UGLIFY_CMD) dist/external-helpers.js >dist/external-helpers.min.js

	rm -rf templates.json

clean:
	rm -rf coverage templates.json test/tmp dist lib

test-clean:
	rm -rf test/tmp

test: test-parser
	node $(MOCHA_CMD) test/core
	make test-clean

test-all:
	export ALL_BABEL_TESTS=1; \
	make test

test-cov:
	rm -rf coverage
	make build-core-test
	node $(ISTANBUL_CMD) $(MOCHA_CMD) -- test/core

test-parser:
	node test/acorn/run.js

test-travis: bootstrap lint build test

test-browser:
	mkdir -p dist

	node tools/cache-templates
	node tools/build-tests
	node $(BROWSERIFY_CMD) -e test/core/_browser.js >dist/babel-test.js
	rm -rf templates.json tests.json

	test -n "`which open`" && open test/browser.html

publish: lint
	git pull --rebase

	make test

	read -p "Version: " version; \
	npm version $$version --message "v%s"

	make build

	cp dist/browser.js browser.js
	cp dist/browser.min.js browser.min.js

	cp dist/polyfill.js browser-polyfill.js
	cp dist/polyfill.min.js browser-polyfill.min.js

	cp dist/external-helpers.js external-helpers.js
	cp dist/external-helpers.min.js external-helpers.min.js

	node tools/cache-templates
	test -f templates.json

	npm publish

	git push --follow-tags

	make publish-cli
	make publish-runtime

	rm -rf templates.json browser.js browser.min.js browser-polyfill.js browser-polyfill.min.js external-helpers.js external-helpers.min.js

publish-runtime:
	cd packages; \
	node build-runtime.js; \
	cd babel-runtime; \
	npm publish

publish-cli:
	cd packages; \
	node build-cli.js; \
	cd babel-cli; \
	npm publish

bootstrap:
	npm list --global --depth 1 babel >/dev/null 2>&1 && npm uninstall -g babel || true
	npm install
	npm link
	cd packages/babel-cli && npm install && npm link && npm link babel-core
	git submodule update --init
	make build
