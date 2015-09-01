# Why is Babel a monorepo?

Juggling a multimodule project over multiple repos is like X.

Babel follows a monorepo approach, all officially maintained modules are in the same repo.
This is quite taboo but let's look at the pros and cons:

**Pros:**

 * Single lint, build, test and release process.
 * Easy to coordinate changes across modules.
 * Single place to report issues.
 * Easier to setup a development environment.
 * Tests across modules are ran together which finds bugs that touch multiple modules easier.

**Cons:**

 * Codebase looks more intimidating.
 * Repo is bigger in size.
 * ???

## This is dumb! Nobody in open source does this!

[React](https://github.com/facebook/react/tree/master/packages),
[Ember](https://github.com/emberjs/ember.js/tree/master/packages) among others do this.

## Previous discussion

- [Dan Luu](http://danluu.com/monorepo/)
- [Gregory](http://gregoryszorc.com/blog/2014/09/09/on-monolithic-repositories/)
- [Szorc](http://gregoryszorc.com/blog/2015/02/17/lost-productivity-due-to-non-unified-repositories/)
- [Face](https://developers.facebooklive.com/videos/561/big-code-developer-infrastructure-at-facebook-s-scale)[book](https://code.facebook.com/posts/218678814984400/scaling-mercurial-at-facebook/)
- [Benjamin Pollack](http://bitquabit.com/post/unorthodocs-abandon-your-dvcs-and-return-to-sanity/)
- [Benjamin Eberlei](https://qafoo.com/resources/presentations/froscon_2015/monorepos.html)
- [Simon Stewart](http://blog.rocketpoweredjetpants.com/2015/04/monorepo-one-source-code-repository-to.html)
- [Digital Ocean](https://www.digitalocean.com/company/blog/taming-your-go-dependencies/)
- [Google](http://www.infoq.com/presentations/Development-at-Google)
- [Twitter](http://git-merge.com/videos/scaling-git-at-twitter-wilhelm-bierbaum.html)
- [thedufer](http://www.reddit.com/r/programming/comments/1unehr/scaling_mercurial_at_facebook/cek9nkq)
- [Paul Hammant](http://paulhammant.com/categories.html#trunk_based_development)
