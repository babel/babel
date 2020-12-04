FLOW_COMMIT = a1f9a4c709dcebb27a5084acf47755fbae699c25
TEST262_COMMIT = d9740c172652d36194ceae3ed3d0484e9968ebc3
TYPESCRIPT_COMMIT = da8633212023517630de5f3620a23736b63234b1

FORCE_PUBLISH = -f @babel/runtime -f @babel/runtime-corejs2 -f @babel/runtime-corejs3 -f @babel/standalone

# Fix color output until TravisCI fixes https://github.com/travis-ci/travis-ci/issues/7967
export FORCE_COLOR = true

SOURCES = packages codemods eslint

COMMA := ,
EMPTY :=
SPACE := $(EMPTY) $(EMPTY)
COMMA_SEPARATED_SOURCES = $(subst $(SPACE),$(COMMA),$(SOURCES))

YARN := yarn
NODE := $(YARN) node


.PHONY: build build-dist watch lint fix clean test-clean test-only test test-ci publish bootstrap

build: build-bundle
ifneq ("$(BABEL_COVERAGE)", "true")
	$(MAKE) build-standalone
endif

build-bundle: clean clean-lib
	$(YARN) gulp build
	$(MAKE) generate-standalone generate-type-helpers
	# call build again as the generated files might need to be compiled again.
	$(YARN) gulp build
	$(MAKE) build-typings
	$(MAKE) build-dist

build-bundle-ci: bootstrap-only
	$(MAKE) build-bundle

generate-tsconfig:
	$(NODE) scripts/generators/tsconfig.js

generate-standalone:
	$(NODE) packages/babel-standalone/scripts/generate.js

generate-type-helpers:
	$(NODE) packages/babel-types/scripts/generateTypeHelpers.js

build-typings: build-flow-typings build-typescript-typings

build-flow-typings:
	$(NODE) packages/babel-types/scripts/generators/flow.js > packages/babel-types/lib/index.js.flow

build-typescript-typings:
	$(NODE) packages/babel-types/scripts/generators/typescript.js > packages/babel-types/lib/index.d.ts
	$(NODE) packages/babel-types/scripts/generators/typescript.js --ts3.7 > packages/babel-types/lib/index-ts3.7.d.ts

build-standalone: build-babel-standalone

build-standalone-ci: build-bundle-ci
	$(MAKE) build-standalone

build-babel-standalone:
	$(YARN) gulp build-babel-standalone

prepublish-build-standalone:
	BABEL_ENV=production IS_PUBLISH=true $(YARN) gulp build-babel-standalone

build-dist: build-polyfill-dist build-plugin-transform-runtime-dist

build-polyfill-dist:
	cd packages/babel-polyfill; \
	scripts/build-dist.sh

build-plugin-transform-runtime-dist:
	cd packages/babel-plugin-transform-runtime; \
	$(NODE) scripts/build-dist.js

build-no-bundle: clean clean-lib
	BABEL_ENV=development $(YARN) gulp build-no-bundle
	# Ensure that build artifacts for types are created during local
	# development too.
	# Babel-transform-fixture-test-runner requires minified polyfill for performance
	$(MAKE) generate-type-helpers build-typings build-polyfill-dist

watch: build-no-bundle
	BABEL_ENV=development $(YARN) gulp watch

flowcheck-ci:
	$(MAKE) flow

code-quality: tscheck flow lint

tscheck: generate-tsconfig
	make build-typescript-typings
	$(YARN) tsc -b .

flow:
	$(YARN) flow check --strip-root

lint-ci: lint-js-ci lint-ts-ci check-compat-data-ci

lint-js-ci:
	$(MAKE) lint-js

lint-ts-ci:
	$(MAKE) lint-ts

check-compat-data-ci:
	$(MAKE) check-compat-data

lint: lint-js lint-ts

lint-js:
	BABEL_ENV=test $(YARN) eslint scripts $(SOURCES) '*.{js,ts}' --format=codeframe --ext .js,.cjs,.mjs,.ts

lint-ts:
	scripts/lint-ts-typings.sh

fix: fix-json fix-js

fix-js:
	$(YARN) eslint scripts $(SOURCES) '*.{js,ts}' --format=codeframe --ext .js,.cjs,.mjs,.ts --fix

fix-json:
	$(YARN) prettier "{$(COMMA_SEPARATED_SOURCES)}/*/test/fixtures/**/options.json" --write --loglevel warn

check-compat-data:
	cd packages/babel-compat-data; CHECK_COMPAT_DATA=true $(YARN) run build-data

build-compat-data:
	cd packages/babel-compat-data; $(YARN) run build-data

clean: test-clean
	rm -f .npmrc
	rm -rf packages/babel-polyfill/browser*
	rm -rf packages/babel-polyfill/dist
	rm -rf coverage
	rm -rf packages/*/npm-debug*
	rm -rf node_modules/.cache

clean-tsconfig:
	rm -f tsconfig.json
	rm -f packages/*/tsconfig.{tsbuildinfo,json}
	rm -f codemods/*/tsconfig.{tsbuildinfo,json}
	rm -f eslint/*/tsconfig.{tsbuildinfo,json}

test-clean:
	$(foreach source, $(SOURCES), \
		$(call clean-source-test, $(source)))

# Does not work on Windows; use "$(YARN) jest" instead
test-only:
	BABEL_ENV=test ./scripts/test.sh
	$(MAKE) test-clean

test: lint test-only

test-ci: build-standalone-ci
	BABEL_ENV=test $(YARN) jest --maxWorkers=4 --ci
	$(MAKE) test-clean

# Does not work on Windows
test-ci-coverage: SHELL:=/bin/bash
test-ci-coverage:
	BABEL_COVERAGE=true BABEL_ENV=test $(MAKE) bootstrap
	BABEL_ENV=test TEST_TYPE=cov ./scripts/test-cov.sh

bootstrap-flow:
	rm -rf build/flow
	mkdir -p build
	git clone --single-branch --shallow-since=2018-11-01 https://github.com/facebook/flow.git build/flow
	cd build/flow && git checkout -q $(FLOW_COMMIT)

test-flow:
	$(NODE) scripts/parser-tests/flow

test-flow-update-allowlist:
	$(NODE) scripts/parser-tests/flow --update-allowlist

bootstrap-typescript:
	rm -rf ./build/typescript
	mkdir -p ./build
	git clone --single-branch --shallow-since=2019-09-01 https://github.com/microsoft/TypeScript.git ./build/typescript
	cd build/typescript && git checkout -q $(TYPESCRIPT_COMMIT)

test-typescript:
	$(NODE) scripts/parser-tests/typescript

test-typescript-update-allowlist:
	$(NODE) scripts/parser-tests/typescript --update-allowlist

bootstrap-test262:
	rm -rf build/test262
	mkdir -p build
	git clone --single-branch --shallow-since=2019-12-01 https://github.com/tc39/test262.git build/test262
	cd build/test262 && git checkout -q $(TEST262_COMMIT)

test-test262:
	$(NODE) scripts/parser-tests/test262

test-test262-update-allowlist:
	$(NODE) scripts/parser-tests/test262 --update-allowlist

# Does not work on Windows
clone-license:
	./scripts/clone-license.sh

prepublish-build: clean-lib clean-runtime-helpers
	NODE_ENV=production BABEL_ENV=production STRIP_BABEL_8_FLAG=true $(MAKE) build-bundle
	$(MAKE) prepublish-build-standalone clone-license

prepublish:
	$(MAKE) check-yarn-bug-1882
	$(MAKE) bootstrap-only
	$(MAKE) prepublish-build
	IS_PUBLISH=true $(MAKE) test
	# We don't want to publish TS-related files yet, except for @babel/types
	rm -f packages/*/lib/**/*.d.ts{,.map}
	rm -f codemods/*/lib/**/*.d.ts{,.map}
	rm -f eslint/*/lib/**/*.d.ts{,.map}
	$(MAKE) clean-tsconfig
	$(MAKE) build-typescript-typings

new-version:
	git pull --rebase
	$(YARN) release-tool version $(FORCE_PUBLISH)

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

check-yarn-bug-1882:
ifneq ("$(shell grep 3155328e5 .yarn/releases/yarn-*.cjs -c)", "0")
	echo "Your version of yarn is affected by https://github.com/yarnpkg/berry/issues/1882"
	echo "Please run `sed -i -e "s/3155328e5/4567890e5/g" .yarn/releases/yarn-*.cjs`"
	exit 1
endif

publish-ci: prepublish
ifneq ("$(NPM_TOKEN)", "")
	echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
else
	echo "Missing NPM_TOKEN env var"
	exit 1
endif
	$(YARN) release-tool publish --yes
	rm -f .npmrc
	$(MAKE) clean

publish-test:
ifneq ("$(I_AM_USING_VERDACCIO)", "I_AM_SURE")
	echo "You probably don't know what you are doing"
	exit 1
endif
	$(YARN) release-tool version $(VERSION) --all --yes --tag-version-prefix="version-e2e-test-"
	$(MAKE) prepublish-build
	YARN_NPM_PUBLISH_REGISTRY=http://localhost:4873 $(YARN) release-tool publish --yes --tag-version-prefix="version-e2e-test-"
	$(MAKE) clean

bootstrap-only: clean-all
	yarn install

bootstrap: bootstrap-only generate-tsconfig
	$(MAKE) build

clean-lib:
	$(foreach source, $(SOURCES), \
		$(call clean-source-lib, $(source)))

clean-runtime-helpers:
	rm -f packages/babel-runtime/helpers/**/*.js
	rm -f packages/babel-runtime-corejs2/helpers/**/*.js
	rm -f packages/babel-runtime-corejs3/helpers/**/*.js
	rm -rf packages/babel-runtime-corejs2/core-js

clean-all: clean-tsconfig
	rm -rf node_modules
	rm -rf package-lock.json
	rm -rf .changelog

	$(foreach source, $(SOURCES), \
		$(call clean-source-all, $(source)))

	$(MAKE) clean

update-env-corejs-fixture:
	rm -rf packages/babel-preset-env/node_modules/core-js-compat
	$(YARN)
	$(MAKE) build-bundle
	OVERWRITE=true $(YARN) jest packages/babel-preset-env

define clean-source-lib
	rm -rf $(1)/*/lib

endef

define clean-source-test
	rm -rf $(1)/*/test/tmp
	rm -rf $(1)/*/test-fixtures.json

endef

define clean-source-all
	$(call clean-source-lib, $1)
	rm -rf $(1)/*/node_modules
	rm -rf $(1)/*/package-lock.json

endef
