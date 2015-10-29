MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: clean test test-cov test-clean test-travis test-browser publish build bootstrap publish-core publish-runtime build-website build-core watch-core build-core-test clean-core prepublish

build: clean
	./scripts/build.sh

build-dist: build
	cd packages/babel-core; \
	scripts/build-dist.sh
	cd packages/babel-polyfill; \
	scripts/build-dist.sh
	cd packages/babel-runtime; \
	node scripts/build-dist.js

watch: clean
	scripts/build.sh --watch

lint:
	node node_modules/.bin/eslint packages/*/src
	#flow check

clean: test-clean
	rm -rf coverage

test-clean:
	rm -rf packages/*/test/tmp
	rm -rf packages/*/test-fixtures.json

test: lint
	./scripts/test.sh
	make test-clean

test-cov: clean
	BABEL_ENV=test; \
	make build
	./scripts/test-cov.sh

test-travis: bootstrap lint build test

publish:
	git pull --rebase
	make test
	node scripts/publish.js
	make clean
	#./scripts/build-website.sh

bootstrap:
	npm install
	node scripts/bootstrap.js
