MAKEFLAGS = -j1

export NODE_ENV = test

.PHONY: make clean test test-only test-cov test-clean test-travis publish build bootstrap publish-core publish-runtime build-website build-core watch-core build-core-test clean-core prepublish

clean: ; rm -rf ./build

bootstrap-babel: clean
	mkdir ./build
	git clone git@github.com:babel/babel.git ./build/babel
	cd ./build/babel; \
	make bootstrap
	find ./build/babel/packages -type d -name 'babylon' -prune -exec rm -rf '{}' \; -exec ln -s '../../../../../' '{}' \;

test-babel:
	npm run build
	cd ./build/babel; \
	make test-only

