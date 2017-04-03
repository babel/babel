export default class Plugin {
  constructor(plugin: Object, key?: string) {
    this.key = plugin.name || key;

    this.manipulateOptions = plugin.manipulateOptions;
    this.post = plugin.post;
    this.pre = plugin.pre;
    this.visitor = plugin.visitor;
  }

  key: ?string;
  manipulateOptions: ?Function;
  post: ?Function;
  pre: ?Function;
  visitor: Object;
}
