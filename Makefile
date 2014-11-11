BROWSERIFY_CMD = node_modules/browserify/bin/cmd.js
ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs
JSHINT_CMD = node_modules/jshint/bin/jshint
MOCHA_CMD = node_modules/mocha/bin/_mocha

export NODE_ENV = test

.PHONY: clean test test-cov tlint est-travis test-appveyor test-browser publish bench build

clean:
	rm -rf coverage templates.json test/tmp dist

bench:
	npm install es6-transpiler traceur esnext es6now jstransform
	node node_modules/matcha/bin/_matcha

lint:
	$(JSHINT_CMD) lib bin benchmark/index.js

test:
	make lint
	$(MOCHA_CMD)

test-cov:
	rm -rf coverage
	node $(ISTANBUL_CMD) $(MOCHA_CMD) --

test-appveyor:
	node $(ISTANBUL_CMD) $(MOCHA_CMD) -- --reporter spec

test-travis:
	make test-appveyor
	if test -n "$$CODECLIMATE_REPO_TOKEN"; then codeclimate < coverage/lcov.info; fi

test-browser:
	mkdir -p dist

	node bin/cache-templates
	node bin/cache-tests
	node $(BROWSERIFY_CMD) -e test/_browser.js >dist/6to5-test.js
	rm -rf templates.json tests.json

	test -n "`which open`" && open test/browser.html

build:
	mkdir -p dist

	node bin/cache-templates

	node $(BROWSERIFY_CMD) -e lib/6to5/polyfill.js >dist/polyfill.js
	node $(UGLIFY_CMD) dist/polyfill.js >dist/polyfill.min.js

	node $(BROWSERIFY_CMD) lib/6to5/browser.js -s to5 >dist/6to5.js
	node $(UGLIFY_CMD) dist/6to5.js >dist/6to5.min.js

	node bin/6to5-runtime >dist/runtime.js
	node $(UGLIFY_CMD) dist/runtime.js >dist/runtime.min.js

	rm -rf templates.json

publish:
	git pull --rebase

	make test

	make build
	cp dist/6to5.min.js browser.js
	cp dist/polyfill.min.js browser-polyfill.js
	cp dist/runtime.min.js runtime.js

	node bin/cache-templates
	test -f templates.json

	read -p "Version: "  version; \
  npm version $$version --message "v%s"
	npm publish

	git push --follow-tags

	rm -rf templates.json browser.js runtime.js browser-polyfill.js
