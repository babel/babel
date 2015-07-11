MAKEFLAGS = -j1
ISTANBUL_CMD = node_modules/istanbul/lib/cli.js cover
#UGLIFY_CMD = node_modules/uglify-js/bin/uglifyjs --mangle sort
MOCHA_CMD = node_modules/mocha/bin/_mocha
BABEL_CMD = node_modules/babel/bin/babel


export NODE_ENV = test

.PHONY: clean test test-cov test-clean test-travis test-browser publish build bootstrap publish-core publish-runtime build-website build-core watch-core build-core-test clean-core prepublish

build-core: clean-core
	./scripts/build-core.sh

watch-core: clean-core
	./scripts/build-core.sh --watch

clean-core:
	rm -rf packages/*/lib

lint:
	eslint packages/*/src

build: build-core
	cd packages/babel; \
	scripts/build.sh

clean:
	rm -rf coverage packages/babel/templates.json test/tmp dist lib

test-clean:
	rm -rf test/tmp

test:
	./scripts/test.sh
	make test-clean

test-browser:
	./scripts/test-browser.sh

test-cov:
	rm -rf coverage
	BABEL_ENV=test; \
	make build-core
	node $(ISTANBUL_CMD) $(MOCHA_CMD) -- test/core

test-travis: bootstrap lint build test

publish: lint
	git pull --rebase
	make test
	read -p "Version: " version; \
	npm version $$version --message "v%s"
	git push --follow-tags

publish-runtime:
	cd packages; \
	node build-runtime.js; \
	cd babel-runtime; \
	npm publish

travis-deploy:
	@./scripts/travis/publish-cli.sh
	make publish-runtime
	@./scripts/travis/build-website.sh
	@./scripts/travis/comment-issues.sh

bootstrap:
	./scripts/bootstrap.sh
