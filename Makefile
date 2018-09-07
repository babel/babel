MAKEFLAGS = -j1

export NODE_ENV = test

# Fix color output until TravisCI fixes travis-ci/travis-ci/issues/7967
export FORCE_COLOR = true

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

test-ci-coverage: SHELL:=/bin/bash
test-ci-coverage:
	BABEL_ENV=cov make bootstrap
	./scripts/test-cov.sh
	bash <(curl -s https://codecov.io/bash) -f coverage/coverage-final.json

clone-license:
	./scripts/clone-license.sh

publish-with-licenses:
	make clone-license
	find packages -name LICENSE | xargs git add -f
	git commit -m 'chore: commit LICENSE files temporarilly'
	node ./scripts/lerna.js publish --only-explicit-updates
	git reset HEAD^ # TMP

publish:
	node scripts/verify-lerna-version.js
	git pull --rebase
	rm -rf packages/*/lib
	BABEL_ENV=production make build-dist
	make test
	make publish-with-licenses
	make clean

bootstrap:
	make clean-all
	npm install
	node ./scripts/lerna.js bootstrap
	make build
	cd packages/babel-runtime; \
	npm install; \
	node scripts/build-dist.js
