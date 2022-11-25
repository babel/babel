FLOW_COMMIT = 92bbb5e9dacb8185aa73ea343954d0434b42c40b
TEST262_COMMIT = 83a46bfe0e79aed8274a1b9f4beb0a2efa0b3533
TYPESCRIPT_COMMIT = ce85d647ef88183c019588bcf398320ce29b625a

# Fix color output until TravisCI fixes https://github.com/travis-ci/travis-ci/issues/7967
export FORCE_COLOR = true

SOURCES = packages codemods eslint

COMMA := ,
EMPTY :=
SPACE := $(EMPTY) $(EMPTY)
COMMA_SEPARATED_SOURCES = $(subst $(SPACE),$(COMMA),$(SOURCES))

YARN := yarn
NODE := $(YARN) node
MAKEJS := node Makefile.js


.PHONY: build build-dist watch lint fix clean test-clean test-only test test-ci publish bootstrap use-esm use-cjs

build:
	$(MAKEJS) build

build-bundle:
	$(MAKEJS) build-bundle

build-no-bundle:
	$(MAKEJS) build-no-bundle

generate-tsconfig:
	$(MAKEJS) generate-tsconfig

generate-type-helpers:
	$(MAKEJS) generate-type-helpers

build-flow-typings:
	$(MAKEJS) build-flow-typings

# For TypeScript older than 3.7
build-typescript-legacy-typings:
	$(MAKEJS) build-typescript-legacy-typings

build-standalone:
	$(MAKEJS) build-standalone

build-standalone-ci: build-no-bundle-ci
	$(MAKEJS) build-standalone

prepublish-build-standalone:
	$(MAKEJS) prepublish-build-standalone

build-dist: build-plugin-transform-runtime-dist

build-plugin-transform-runtime-dist:
	$(MAKEJS) build-plugin-transform-runtime-dist

watch:
	$(MAKEJS) watch

code-quality: tscheck lint

tscheck:
	$(MAKEJS) tscheck

lint-ci: lint check-compat-data-ci

check-compat-data-ci: check-compat-data

lint:
	$(MAKEJS) lint

fix: fix-json fix-js

fix-js:
	$(MAKEJS) fix-js

fix-json:
	$(MAKEJS) fix-json

clean:
	$(MAKEJS) clean

test-cov:
	$(MAKEJS) test-cov

test: lint test-only

clone-license:
	$(MAKEJS) clone-license

prepublish-build:
	$(MAKEJS) prepublish-build

prepublish:
	$(MAKEJS) prepublish

bootstrap-only:
	$(MAKEJS) bootstrap-only

bootstrap:
	$(MAKEJS) bootstrap

use-cjs:
	$(MAKEJS) use-cjs

use-esm:
	$(MAKEJS) use-esm

clean-lib:
	$(MAKEJS) clean-lib

clean-runtime-helpers:
	$(MAKEJS) clean-runtime-helpers

clean-all:
	$(MAKEJS) clean-all


build-no-bundle-ci: bootstrap-only
	$(YARN) gulp build-dev
	$(MAKE) build-flow-typings
	$(MAKE) build-dist

# Does not work on Windows; use "$(YARN) jest" instead
test-only:
	BABEL_ENV=test ./scripts/test.sh
	$(MAKE) test-clean

check-compat-data:
	cd packages/babel-compat-data; CHECK_COMPAT_DATA=true $(YARN) run build-data

build-compat-data:
	cd packages/babel-compat-data; $(YARN) run build-data

update-env-corejs-fixture:
	rm -rf packages/babel-preset-env/node_modules/core-js-compat
	$(YARN)
	$(MAKE) build-bundle
	OVERWRITE=true $(YARN) jest packages/babel-preset-env

test-ci: build-standalone-ci
	BABEL_ENV=test $(YARN) jest --maxWorkers=100% --ci
	$(MAKE) test-clean

test-ci-coverage:
	BABEL_ENV=test $(MAKE) bootstrap
	BABEL_ENV=test BABEL_COVERAGE=true $(YARN) c8 jest --maxWorkers=100% --ci
	rm -rf coverage/tmp

bootstrap-flow:
	rm -rf build/flow
	mkdir -p build
	git clone --filter=blob:none --sparse --single-branch --shallow-since=2021-05-01 https://github.com/facebook/flow.git build/flow
	cd build/flow && git sparse-checkout set "src/parser/test/flow"
	cd build/flow && git checkout -q $(FLOW_COMMIT)

test-flow:
	$(NODE) scripts/parser-tests/flow

test-flow-update-allowlist:
	$(NODE) scripts/parser-tests/flow --update-allowlist

bootstrap-typescript:
	rm -rf ./build/typescript
	mkdir -p ./build
	git clone --filter=blob:none --sparse --single-branch --shallow-since=2022-04-01 https://github.com/microsoft/TypeScript.git ./build/typescript
	cd build/typescript && git sparse-checkout set "tests"
	cd build/typescript && git checkout -q $(TYPESCRIPT_COMMIT)

test-typescript:
	$(NODE) scripts/parser-tests/typescript

test-typescript-update-allowlist:
	$(NODE) scripts/parser-tests/typescript --update-allowlist

bootstrap-test262:
	rm -rf build/test262
	mkdir -p build
	git clone --filter=blob:none --sparse --single-branch --shallow-since=2021-05-01 https://github.com/tc39/test262.git build/test262
	cd build/test262 && git sparse-checkout set "test" "harness"
	cd build/test262 && git checkout -q $(TEST262_COMMIT)

test-test262:
	$(NODE) scripts/parser-tests/test262

test-test262-update-allowlist:
	$(NODE) scripts/parser-tests/test262 --update-allowlist


new-version-checklist:
	# @echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	# @echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	# @echo "!!!!!!                                                   !!!!!!"
	# @echo "!!!!!! Update the minVersion of packages/babel-helpers/src/helpers/checkInRHS.js"
	# @echo "!!!!!!                                                   !!!!!!"
	# @echo "!!!!!!                                                   !!!!!!"
	# @echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	# @echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	# @exit 1

new-version:
	$(MAKE) new-version-checklist
	git pull --rebase
	$(YARN) release-tool version -f @babel/standalone

# NOTE: Run make new-version first
publish:
	@echo "Please confirm you have stopped make watch. (y)es, [N]o:"; \
	read CLEAR; \
	if [ "_$$CLEAR" != "_y" ]; then \
		exit 1; \
	fi
	$(MAKE) prepublish
	$(YARN) release-tool publish
	$(MAKE) clean

publish-test:
ifneq ("$(I_AM_USING_VERDACCIO)", "I_AM_SURE")
	echo "You probably don't know what you are doing"
	exit 1
endif
	$(YARN) release-tool version $(VERSION) --all --yes --tag-version-prefix="version-e2e-test-"
	$(MAKE) prepublish-build
	node ./scripts/set-module-type.js clean
	YARN_NPM_PUBLISH_REGISTRY=http://localhost:4873 $(YARN) release-tool publish --yes --tag-version-prefix="version-e2e-test-"
	$(MAKE) clean
