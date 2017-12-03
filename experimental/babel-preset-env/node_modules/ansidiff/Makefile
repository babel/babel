
#---- Tools

TAP := ./node_modules/.bin/tap


#---- Files

JSSTYLE_FILES := $(shell find lib test tools -name *.js)



#---- Targets

.PHONY: all
all:

.PHONY: cutarelease
cutarelease:
	[[ ! -d tmp ]]   # No 'tmp/' allowed: https://github.com/isaacs/npm/issues/2144
	./tools/cutarelease.py -p ansidiff -f package.json

.PHONY: test
test: $(TAP)
	TAP=1 $(TAP) test/*.test.js

.PHONY: check-jsstyle
check-jsstyle: $(JSSTYLE_FILES)
	./tools/jsstyle -f ./tools/jsstyle.conf $(JSSTYLE_FILES)

.PHONY: check
check: check-jsstyle
	@echo "Check ok."

.PHONY: prepush
prepush: check test
	@echo "Okay to push."
