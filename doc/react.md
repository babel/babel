# React/JSX

6to5 has built-in support for React v0.12. Tags are automatically transformed to
their equivalent `React.createElement(...)` and `displayName` is automatically
inferred and added to all `React.createClass` calls.

## Blacklist

To disable this behaviour add `react` to your blacklist:

```javascript
to5.transform("code", { blacklist: ["react"] });
```

```sh
$ 6to5 --blacklist react
```
