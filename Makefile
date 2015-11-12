MAKEFLAGS = -j1

export NODE_ENV = test

PATH := node_modules/.bin:$(PATH)

.PHONY: clean test test-only test-cov test-clean test-travis publish build bootstrap publish-core publish-runtime build-website build-core watch-core build-core-test clean-core prepublish

build: clean
	gulp build

build-dist: build
	cd packages/babel-polyfill; \
	scripts/build-dist.sh
	cd packages/babel-runtime; \
	node scripts/build-dist.js

watch: clean
	gulp watch

lint:
	node node_modules/.bin/eslint packages/*/src
	#flow check

clean: test-clean
	rm -rf packages/babel-polyfill/browser*
	rm -rf coverage
	rm -rf packages/*/npm-debug*

test-clean:
	rm -rf packages/*/test/tmp
	rm -rf packages/*/test-fixtures.json

test-only:
	./scripts/test.sh
	make test-clean

test: lint test-only

test-cov: clean
	# rebuild with test
	rm -rf packages/*/lib
	BABEL_ENV=test; gulp build

	./scripts/test-cov.sh

test-ci:
	make lint
	NODE_ENV=test make bootstrap
	./scripts/test-cov.sh
	cat ./coverage/coverage.json | ./node_modules/codecov.io/bin/codecov.io.js

publish:
	git pull --rebase
	make test
	node scripts/publish.js
	make clean
	#./scripts/build-website.sh

bootstrap:
	npm install
	node scripts/bootstrap.js
	make build
	cd packages/babel-runtime; \
	node scripts/build-dist.js
