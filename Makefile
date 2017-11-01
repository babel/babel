MAKEFLAGS = -j1

export NODE_ENV = test

# Fix color output until TravisCI fixes https://github.com/travis-ci/travis-ci/issues/7967
export FORCE_COLOR = true

SOURCES = packages codemods experimental

.PHONY: build build-dist watch lint fix clean test-clean test-only test test-ci publish bootstrap

build: clean
	make clean-lib
	./node_modules/.bin/gulp build
ifeq ("$(INCLUDE_STANDALONE)", "true")
	make build-standalone
endif

build-runtime:
	cd packages/babel-runtime; \
	node scripts/build-dist.js

build-standalone:
	./node_modules/.bin/gulp build-babel-standalone

build-dist:
	INCLUDE_STANDALONE=true make build-standalone
	cd packages/babel-polyfill; \
	scripts/build-dist.sh
	make build-runtime
	node scripts/generate-babel-types-docs.js

watch: clean
	make clean-lib
	BABEL_ENV=development ./node_modules/.bin/gulp watch

flow:
	./node_modules/.bin/flow check --strip-root

lint:
	./node_modules/.bin/eslint scripts $(SOURCES) *.js --format=codeframe --rulesdir="./scripts/eslint_rules"

fix:
	./node_modules/.bin/eslint scripts $(SOURCES) *.js --format=codeframe --fix --rulesdir="./scripts/eslint_rules"

clean: test-clean
	rm -rf packages/babel-polyfill/browser*
	rm -rf packages/babel-polyfill/dist
	# rm -rf packages/babel-runtime/helpers
	# rm -rf packages/babel-runtime/core-js
	rm -rf coverage
	rm -rf packages/*/npm-debug*

test-clean:
	$(foreach source, $(SOURCES), \
		$(call clean-source-test, $(source)))

test-only:
	./scripts/test.sh
	make test-clean

test: lint test-only

test-ci:
	INCLUDE_STANDALONE=true make bootstrap
	INCLUDE_STANDALONE=true make test-only

test-ci-coverage: SHELL:=/bin/bash
test-ci-coverage:
	INCLUDE_STANDALONE=true make bootstrap
	./scripts/test-cov.sh
	bash <(curl -s https://codecov.io/bash) -f coverage/coverage-final.json

publish:
	git pull --rebase
	make clean-lib
	BABEL_ENV=production make build-dist
	make test
	# not using lerna independent mode atm, so only update packages that have changed since we use ^
	# --only-explicit-updates
	./node_modules/.bin/lerna publish --force-publish=* --npm-tag=next --exact --skip-temp-tag
	make clean

bootstrap:
	make clean-all
	yarn
ifeq ("$(INCLUDE_STANDALONE)", "true")
	./node_modules/.bin/lerna bootstrap
else
	./node_modules/.bin/lerna bootstrap --ignore babel-standalone
endif
	make build
	make build-runtime

clean-lib:
	$(foreach source, $(SOURCES), \
		$(call clean-source-lib, $(source)))

clean-all:
	rm -rf node_modules
	rm -rf package-lock.json

	$(foreach source, $(SOURCES), \
		$(call clean-source-all, $(source)))

	make clean

define clean-source-lib
	rm -rf $(1)/*/lib

endef

define clean-source-test
	rm -rf $(1)/*/test/tmp
	rm -rf $(1)/*/test-fixtures.json

endef

define clean-source-all
	rm -rf $(1)/*/lib
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json

endef
