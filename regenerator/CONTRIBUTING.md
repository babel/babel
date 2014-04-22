# Contributing to Regenerator

Regenerator uses GitHub as its sole source of truth. Everything happens
here. Facebook employees who contribute to Regenerator are expected to do
so in the same way as everyone else. In other words, this document applies
equally to all contributors.

### `master` is unsafe

We will do our best to keep `master` in good shape, with tests passing at
all times. But in order to move fast, we will make API changes that your
application might not be compatible with. We will do our best to
communicate these changes and always version appropriately so you can lock
into a specific version if need be.

### Pull Requests

In case you've never submitted a pull request (PR) via GitHub before,
please read [this short
tutorial](https://help.github.com/articles/creating-a-pull-request). If
you've submitted a PR before, there should be nothing surprising about our
procedures for Regenerator.

*Before* submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests!
3. Ensure the test suite passes (`npm test`).
4. If you haven't already, complete the CLA.
5. Submit a pull request via GitHub.
6. Check that Travis CI tests pass (pull request turns green).

### Contributor License Agreement ("CLA")

In order to accept your pull request, we need you to submit a CLA. You
only need to do this once, so if you've done this for another Facebook
open source project, you're good to go. If you are submitting a pull
request for the first time, just let us know that you have completed the
CLA and we can cross-check with your GitHub username.

Complete your CLA here: <https://code.facebook.com/cla>

## Bugs

### Where to Find Known Issues

We will be using GitHub Issues for all bugs. Before filing a new issue,
please try to make sure your problem doesn't already exist. If you think
your issue is more general than one that already exists, our preference is
still to modify the original issue to reflect the underlying problem more
faithfully.

### Reporting New Issues

The best way to get a bug fixed is to provide a reduced test case, and the
easiest way to reduce a testcase is to edit it in [the
sandbox](http://facebook.github.io/regenerator/) until you're satisfied
and then click the "report a bug" link (the new issue will be populated
automatically with your code).

### Security Bugs

Facebook has a [bounty program](https://www.facebook.com/whitehat/) for
the safe disclosure of security bugs. With that in mind, please do not
file public issues and go through the process outlined on that page.

## Coding Style

* Use semicolons;
* Commas last,
* 2 spaces for indentation (no tabs).
* Prefer `"` over `'`
* 80 character line length
* Match surrounding coding style.
* Less code is better code.

## License

By contributing to Regenerator, you agree that your contributions will be
licensed under the [BSD License](LICENSE).
