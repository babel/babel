MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: build build-dist watch lint fix clean test-clean test-only test test-ci publish bootstrap

build: clean
	./node_modules/.bin/gulp build

build-dist: build
	cd packages/babel-polyfill; \
	scripts/build-dist.sh
	cd packages/babel-runtime; \
	node scripts/build-dist.js
	node scripts/generate-babel-types-docs.js

watch: clean
	rm -rf packages/*/lib
	./node_modules/.bin/gulp watch

lint:
	./node_modules/.bin/eslint packages/ --format=codeframe

flow:
	./node_modules/.bin/flow check

fix:
	./node_modules/.bin/eslint packages/ --format=codeframe --fix

clean: test-clean
	rm -rf packages/babel-polyfill/browser*
	rm -rf packages/babel-polyfill/dist
	rm -rf coverage
	rm -rf packages/*/npm-debug*

test-clean:
	rm -rf packages/*/test/tmp
	rm -rf packages/*/test-fixtures.json

clean-all:
	rm -rf node_modules
	rm -rf packages/*/node_modules
	make clean

test-only:
	./scripts/test.sh
	make test-clean

test: lint test-only

test-ci:
	make bootstrap
	make test-only

test-ci-coverage:
	BABEL_ENV=cov make bootstrap
	./scripts/test-cov.sh
	./node_modules/.bin/codecov -f coverage/coverage-final.json

publish:
	git pull --rebase
	rm -rf packages/*/lib
	BABEL_ENV=production make build-dist
	make test
	# not using lerna independent mode atm, so only update packages that have changed since we use ^
	./node_modules/.bin/lerna publish --only-explicit-updates
	make clean

bootstrap:
	make clean-all
	npm install
	./node_modules/.bin/lerna bootstrap
	make build
	cd packages/babel-runtime; \
	npm install; \
	node scripts/build-dist.js
