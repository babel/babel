---
name: "\U0001F4E6 npm error"
about: "When you get a `No matching version found for ...` error from npm"
title: ''
labels: 'i: npm cache'
assignees: ''

---

<!------------^ Click "Preview" for a nicer view!  -->

First of all, check if the package for which `npm` throws an error is actually published by searching [on the npm website](https://www.npmjs.com/).

If it is, then there is nothing that we can do about it: it was correctly published, but for some reason your package manager client doesn't find it.

If you are using a proxy for the npm registry (maybe it's used by your company, or you are using it because your country blocks the main npm registry), then it's likely that it has cached the old version of the package and it isn't loading the new one. If you can, try clearing the proxy's cache. Otherwise, you will have to wait until the cache is automatically updated (it might take a few hours, or even days).

If you are not using a proxy, or if it isn't a caching problem, please report the issue to npm (https://github.com/npm/cli/issues/new/choose) instead of in this repo!
