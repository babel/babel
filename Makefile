MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: clean test test-only test-cov test-clean test-travis publish build bootstrap publish-core publish-runtime build-website build-core watch-core build-core-test clean-core prepublish

build: clean
	./node_modules/.bin/gulp build

build-dist: build
	cd packages/babel-polyfill; \
	scripts/build-dist.sh
	cd packages/babel-runtime; \
	node scripts/build-dist.js

watch: clean
	./node_modules/.bin/gulp watch

lint:
	./node_modules/.bin/eslint packages/*/src

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
	BABEL_ENV=test; ./node_modules/.bin/gulp build

	./scripts/test-cov.sh

test-ci:
	make lint
	NODE_ENV=test make bootstrap
	node scripts/run-flow-check.js
	./scripts/test-cov.sh
	cat ./coverage/coverage.json | ./node_modules/codecov.io/bin/codecov.io.js

publish:
	git pull --rebase
	make build
	make test
	./node_modules/.bin/lerna publish
	make clean
	#./scripts/build-website.sh

bootstrap:
	npm install
	./node_modules/.bin/lerna bootstrap
	make build
	cd packages/babel-runtime; \
	node scripts/build-dist.js
