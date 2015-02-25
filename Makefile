BROWSERIFY_CMD = node_modules/browserify/bin/cmd.js
ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs
#UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs --mangle sort
JSHINT_CMD = node_modules/jshint/bin/jshint
MOCHA_CMD = node_modules/mocha/bin/_mocha
BABEL_CMD = node_modules/babel/bin/babel

export NODE_ENV = test

.PHONY: clean test test-cov test-clean test-travis test-simple test-all test-browser publish build bootstrap publish-core publish-runtime build-core watch-core

build-core:
	node $(BABEL_CMD) src --out-dir lib --copy-files

watch-core:
	node $(BABEL_CMD) src --out-dir lib --watch --copy-files

build:
	mkdir -p dist
	make build-core

	node tools/cache-templates

	node $(BROWSERIFY_CMD) -e lib/babel/polyfill.js >dist/polyfill.js
	node $(UGLIFY_CMD) dist/polyfill.js >dist/polyfill.min.js

	node $(BROWSERIFY_CMD) lib/babel/api/browser.js -s babel >dist/babel.js
	node $(UGLIFY_CMD) dist/babel.js >dist/babel.min.js

	node bin/babel-external-helpers >dist/external-helpers.js
	node $(UGLIFY_CMD) dist/external-helpers.js >dist/external-helpers.min.js

	rm -rf templates.json

clean:
	rm -rf coverage templates.json test/tmp dist

test-clean:
	rm -rf test/tmp

test:
	$(MOCHA_CMD)
	make test-clean

test-simple:
	# excludes test262
	export SIMPLE_BABEL_TESTS=1; \
	make test

test-all:
	export ALL_BABEL_TESTS=1; \
	make test

test-cov:
	rm -rf coverage
	export SIMPLE_BABEL_TESTS=1; \
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --

test-travis: build-core bootstrap
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

test-browser:
	mkdir -p dist

	node tools/cache-templates
	node tools/cache-tests
	node $(BROWSERIFY_CMD) -e test/_browser.js >dist/babel-test.js
	rm -rf templates.json tests.json

	test -n "`which open`" && open test/browser.html

publish:
	git pull --rebase

	make test

	read -p "Version: " version; \
	npm version $$version --message "v%s"

	make build
	cp dist/babel.min.js browser.js
	cp dist/polyfill.min.js browser-polyfill.js
	cp dist/external-helpers.min.js external-helpers.js

	node tools/cache-templates
	test -f templates.json

	npm publish

	git push --follow-tags

	make publish-core
	make publish-runtime

	rm -rf templates.json browser.js browser-polyfill.js external-helpers.js

publish-runtime:
	cd packages; \
	node build-runtime.js; \
	cd babel-runtime; \
	npm publish

publish-core:
	tools/generate-core-package-json >package2.json
	mv package.json .package.json
	mv package2.json package.json

	npm publish

	rm -rf package.json
	mv .package.json package.json

bootstrap:
	npm install
	git submodule update --init
	cd vendor/regenerator && npm install
	cd vendor/compat-table && npm install object-assign
