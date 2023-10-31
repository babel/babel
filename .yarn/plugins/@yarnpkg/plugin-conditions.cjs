/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-conditions",
factory: function (require) {
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // sources/index.ts
  var sources_exports = {};
  __export(sources_exports, {
    default: () => plugin
  });

  // sources/ConditionProtocol/Resolver.ts
  var import_core3 = __require("@yarnpkg/core");

  // sources/conditionUtils.ts
  var import_core = __require("@yarnpkg/core");

  // sources/conditionParser.ts
  function parse(source) {
    const PROTOCOL = "condition:";
    if (!source.startsWith(PROTOCOL, 0)) {
      throw new Error(`Expected 'condition:' at index 0 (${source})`);
    }
    let pos = PROTOCOL.length;
    skipWs();
    const test = eatRegExp(/[\w-]+/y);
    if (!test) {
      throw new Error(`Expected an identifier at index ${pos} (${source})`);
    }
    skipWs();
    expect("?");
    skipWs();
    let consequent = null;
    if (source[pos] === "(") {
      consequent = eatParenthesized().trim() || null;
    } else if (source[pos] !== ":") {
      consequent = eatRegExp(/[^(:]+/y)?.trimRight() || null;
    }
    expect(":");
    skipWs();
    let alternate = null;
    if (pos < source.length) {
      if (source[pos] === "(" && !source.startsWith("esm:", pos + 1)) {
        alternate = eatParenthesized().trim() || null;
      } else if (source[pos] !== ":") {
        alternate = eatRegExp(/[^(#]+/y)?.trimRight() || null;
      }
    }
    let esmExports = parseList("esm");
    let peers = parseList("peer");
    if (!esmExports && peers)
      esmExports = parseList("esm");
    let hash = null;
    if (pos < source.length && source[pos] === "#") {
      pos++;
      hash = eatRegExp(/\w+/y);
      skipWs();
    }
    if (pos !== source.length) {
      throw new Error(`Unexpected '${source[pos]}' at index ${pos} (${source})`);
    }
    return { test, consequent, alternate, esmExports, peers, hash };
    function expect(ch) {
      if (source[pos] !== ch) {
        throw new Error(`Expected '${ch}' at index ${pos} (${source})`);
      }
      pos++;
    }
    function skipWs() {
      eatRegExp(/\s*/y);
    }
    function eatRegExp(re) {
      re.lastIndex = pos;
      const match = re.exec(source);
      if (!match)
        return null;
      pos += match[0].length;
      return match[0];
    }
    function eatParenthesized() {
      expect("(");
      let depth = 1;
      let contents = "";
      while (depth) {
        if (pos === source.length) {
          throw new Error(`Expected ')' at index ${pos} (${source})`);
        }
        const ch = source[pos];
        if (ch === "(")
          depth++;
        if (ch === ")")
          depth--;
        if (ch !== ")" || depth > 0) {
          contents += ch;
        }
        pos++;
      }
      skipWs();
      return contents;
    }
    function parseList(prefix) {
      if (pos < source.length && source.startsWith(`(${prefix}:`, pos)) {
        const items = eatParenthesized().slice(prefix.length + 1).trim();
        if (items)
          return items.split("|").map((s) => s.trim());
      }
      return null;
    }
  }

  // sources/constants.ts
  var DEPENDENCY_TYPES = [
    "dependencies",
    "devDependencies",
    "peerDependencies"
  ];
  var CACHE_VERSION = 11;

  // sources/conditionUtils.ts
  function hasConditionProtocol(range) {
    return range.startsWith("condition:");
  }
  function parseSpec(spec) {
    try {
      return parse(spec);
    } catch (e) {
      try {
        const { test, consequent, alternate, esmExports, peers } = import_core.structUtils.parseRange(
          spec
        ).params;
        return {
          test,
          consequent: consequent || null,
          alternate: alternate || null,
          esmExports: esmExports || null,
          peers: peers || null
        };
      } catch {
        throw e;
      }
    }
  }
  function parseDescriptor(descriptor) {
    return parseSpec(descriptor.range);
  }
  function parseLocator(locator) {
    return parseSpec(locator.reference);
  }
  function makeSpec({
    test,
    consequent,
    alternate,
    esmExports,
    peers,
    hash
  }) {
    let spec = `condition:${test}?`;
    if (consequent)
      spec += consequent;
    spec += ":";
    if (alternate)
      spec += alternate;
    if (esmExports)
      spec += `(esm:${esmExports.join("|")})`;
    if (peers)
      spec += `(peer:${peers.join("|")})`;
    if (hash)
      spec += `#${hash}`;
    return spec;
  }
  function makeLocator(ident, {
    test,
    consequent,
    alternate,
    esmExports,
    peers,
    hash
  }) {
    return import_core.structUtils.makeLocator(
      ident,
      makeSpec({ test, consequent, alternate, esmExports, peers, hash })
    );
  }
  function makeQualifiedDescriptor(project, base, test, range, result) {
    const ident = import_core.structUtils.makeIdent(
      base.scope,
      `${base.name}-${test}-${result}`
    );
    const qualifiedRange = project.configuration.get("defaultProtocol") + `${import_core.structUtils.stringifyIdent(base)}@${range}`;
    return import_core.structUtils.makeDescriptor(ident, qualifiedRange);
  }
  function makeHash(test, consequent, alternate, esmExports, peers, defaultValue) {
    return import_core.hashUtils.makeHash(
      String(CACHE_VERSION),
      test,
      consequent || "-",
      alternate || "-",
      esmExports?.join("|") || "-",
      peers?.join("|") || "-",
      defaultValue ? "1" : "0"
    ).slice(0, 6);
  }

  // sources/configuration.ts
  var import_core2 = __require("@yarnpkg/core");
  var configuration = {
    conditions: {
      description: "",
      type: import_core2.SettingsType.MAP,
      valueDefinition: {
        description: "",
        type: import_core2.SettingsType.SHAPE,
        properties: {
          source: {
            description: "",
            type: import_core2.SettingsType.STRING,
            default: "env"
          },
          default: {
            description: "",
            type: import_core2.SettingsType.BOOLEAN,
            default: false
          }
        }
      }
    }
  };
  function assertKnownCondition(project, condition) {
    const config = project.configuration;
    if (!config.get("conditions").has(condition)) {
      throw new Error(
        `Unknown condition: ${condition}. You must add it to your .yarnrc.yml file.`
      );
    }
  }
  function getDefaultTestValue(project, test) {
    assertKnownCondition(project, test);
    return project.configuration.get("conditions").get(test).get("default");
  }
  function evaluateCondition(project, condition) {
    assertKnownCondition(project, condition);
    const opt = project.configuration.get("conditions").get(condition);
    const source = opt.get("source");
    const defaultValue = opt.get("default");
    if (source !== "env") {
      throw new Error("The only supported configuration source is 'env'");
    }
    return bool(process.env[condition]) ?? defaultValue;
  }
  function bool(value) {
    return value && value !== "false" && value !== "0";
  }

  // sources/ConditionProtocol/Resolver.ts
  var ConditionResolver = class {
    supportsDescriptor(descriptor) {
      return hasConditionProtocol(descriptor.range);
    }
    supportsLocator(locator) {
      return hasConditionProtocol(locator.reference);
    }
    shouldPersistResolution() {
      return false;
    }
    bindDescriptor(descriptor) {
      return descriptor;
    }
    getResolutionDependencies(descriptor, opts) {
      const { test, consequent, alternate } = parseDescriptor(descriptor);
      const result = {};
      if (consequent) {
        result.consequent = makeQualifiedDescriptor(
          opts.project,
          descriptor,
          test,
          consequent,
          true
        );
      }
      if (alternate) {
        result.alternate = makeQualifiedDescriptor(
          opts.project,
          descriptor,
          test,
          alternate,
          false
        );
      }
      return result;
    }
    async getCandidates(descriptor, dependencies, opts) {
      const { test, consequent, alternate, esmExports, peers } = parseDescriptor(descriptor);
      const hash = makeHash(
        test,
        consequent,
        alternate,
        esmExports,
        peers,
        getDefaultTestValue(opts.project, test)
      );
      return [
        makeLocator(descriptor, {
          test,
          consequent,
          alternate,
          esmExports,
          peers,
          hash
        })
      ];
    }
    async getSatisfying(descriptor, dependencies, locators, opts) {
      const [locator] = await this.getCandidates(descriptor, dependencies, opts);
      return {
        locators: locators.filter(
          (candidate) => candidate.locatorHash === locator.locatorHash
        ),
        sorted: false
      };
    }
    async resolve(locator, opts) {
      const { test, consequent, alternate, esmExports, peers } = parseLocator(locator);
      const hash = makeHash(
        test,
        consequent,
        alternate,
        esmExports,
        peers,
        getDefaultTestValue(opts.project, test)
      );
      const consequentDesc = consequent && makeQualifiedDescriptor(
        opts.project,
        locator,
        test,
        consequent,
        true
      );
      const alternateDesc = alternate && makeQualifiedDescriptor(
        opts.project,
        locator,
        test,
        alternate,
        false
      );
      return {
        ...locator,
        version: `0.0.0-condition-${hash}`,
        languageName: opts.project.configuration.get("defaultLanguageName"),
        linkType: import_core3.LinkType.HARD,
        dependencies: new Map(
          [
            consequent && [consequentDesc.identHash, consequentDesc],
            alternate && [alternateDesc.identHash, alternateDesc]
          ].filter(Boolean)
        ),
        peerDependencies: new Map(
          (peers || []).map((peer) => {
            const desc = import_core3.structUtils.parseDescriptor(`${peer}@*`);
            return [desc.identHash, desc];
          })
        ),
        dependenciesMeta: /* @__PURE__ */ new Map(),
        peerDependenciesMeta: /* @__PURE__ */ new Map(),
        bin: null
      };
    }
  };

  // sources/ConditionProtocol/Fetcher.ts
  var import_core5 = __require("@yarnpkg/core");

  // sources/zipUtils.ts
  var import_core4 = __require("@yarnpkg/core");
  var import_fslib = __require("@yarnpkg/fslib");
  var import_libzip = __require("@yarnpkg/libzip");
  var mtime = 15805116e5;
  async function createSimplePackage(locator, project, packageJson, indexJS, indexMJS) {
    const [tmpDir, libzip] = await Promise.all([
      import_fslib.xfs.mktempPromise(),
      (0, import_libzip.getLibzipPromise)()
    ]);
    const tmpFile = import_fslib.ppath.join(tmpDir, "condition.zip");
    const prefixPath = import_core4.structUtils.getIdentVendorPath(locator);
    const conditionPackage = new import_libzip.ZipFS(tmpFile, {
      libzip,
      create: true,
      level: project.configuration.get(`compressionLevel`)
    });
    await conditionPackage.mkdirpPromise(prefixPath);
    await Promise.all([
      conditionPackage.writeJsonPromise(
        import_fslib.ppath.join(prefixPath, "package.json"),
        packageJson
      ),
      conditionPackage.writeFilePromise(
        import_fslib.ppath.join(prefixPath, "index.js"),
        indexJS
      ),
      indexMJS && conditionPackage.writeFilePromise(
        import_fslib.ppath.join(prefixPath, "index.mjs"),
        indexMJS
      )
    ]);
    await Promise.all(
      conditionPackage.getAllFiles().map((path) => conditionPackage.utimesPromise(path, mtime, mtime))
    );
    return conditionPackage;
  }

  // sources/ConditionProtocol/Fetcher.ts
  var ConditionFetcher = class {
    supports(locator) {
      return hasConditionProtocol(locator.reference);
    }
    getLocalPath() {
      return null;
    }
    async fetch(locator, opts) {
      const expectedChecksum = opts.checksums.get(locator.locatorHash) || null;
      const [
        packageFs,
        releaseFs,
        checksum
      ] = await opts.cache.fetchPackageFromCache(locator, expectedChecksum, {
        onHit: () => opts.report.reportCacheHit(locator),
        onMiss: () => opts.report.reportCacheMiss(
          locator,
          `${import_core5.structUtils.prettyLocator(
            opts.project.configuration,
            locator
          )} can't be found in the cache and will be fetched from the disk`
        ),
        loader: () => this.generateConditionPackage(locator, opts),
        skipIntegrityCheck: opts.skipIntegrityCheck
      });
      return {
        packageFs,
        releaseFs,
        prefixPath: import_core5.structUtils.getIdentVendorPath(locator),
        localPath: this.getLocalPath(),
        checksum
      };
    }
    async generateConditionPackage(locator, opts) {
      const {
        test,
        consequent: consequentOpt,
        alternate: alternateOpt,
        esmExports: esmExportsOpt,
        peers: peersOpt
      } = parseLocator(locator);
      const defaultValue = getDefaultTestValue(opts.project, test);
      const hash = makeHash(
        test,
        consequentOpt,
        alternateOpt,
        esmExportsOpt,
        peersOpt,
        defaultValue
      );
      const prepare = (option, result) => {
        if (option == null) {
          return {
            dependency: null,
            require: `null`,
            esmHeader: ``,
            imported: `{ __proto__: null }`
          };
        }
        const desc = makeQualifiedDescriptor(
          opts.project,
          locator,
          test,
          option,
          result
        );
        const name = import_core5.structUtils.stringifyIdent(desc);
        const varId = `if_${result}`;
        return {
          dependency: { [name]: desc.range },
          require: `require(${JSON.stringify(name)})`,
          esmHeader: `import * as ${varId} from ${JSON.stringify(name)};`,
          imported: varId
        };
      };
      const consequent = prepare(consequentOpt, true);
      const alternate = prepare(alternateOpt, false);
      const packageJson = {
        version: `0.0.0-condition-${hash}`,
        dependencies: {
          ...consequent.dependency,
          ...alternate.dependency
        },
        ...esmExportsOpt && {
          exports: {
            require: "./index.js",
            default: "./index.mjs"
          }
        },
        ...peersOpt && {
          peerDependencies: Object.fromEntries(peersOpt.map((name) => [name, "*"]))
        }
      };
      const boolFn = `// env vars from the cli are always strings, so !!ENV_VAR returns true for "false"
function bool(value) {
  if (value == null) return ${defaultValue};
  return value && value !== "false" && value !== "0";
}
`;
      let indexJS = `${boolFn}
module.exports = bool(process.env[${JSON.stringify(test)}])
  ? ${consequent.require}
  : ${alternate.require};
`;
      let indexMJS = null;
      if (esmExportsOpt) {
        indexJS += `0 && (${esmExportsOpt.map((n) => `exports.${n} = `).join("")} 0);`;
        let hasDefault = false;
        const nonDefaultExports = [];
        for (const name of esmExportsOpt) {
          if (name === "default") {
            hasDefault = true;
          } else {
            nonDefaultExports.push(name);
          }
        }
        indexMJS = `${boolFn}
${consequent.esmHeader}
${alternate.esmHeader}

export const { ${nonDefaultExports.join(", ")} } = bool(process.env[${JSON.stringify(test)}]) ? ${consequent.imported} : ${alternate.imported};
${hasDefault && `export default (bool(process.env[${JSON.stringify(test)}]) ? ${consequent.imported} : ${alternate.imported}).default;`}
`;
      }
      return createSimplePackage(
        locator,
        opts.project,
        packageJson,
        indexJS,
        indexMJS
      );
    }
  };

  // sources/hooks.ts
  var import_core6 = __require("@yarnpkg/core");
  var has = Function.call.bind(Object.prototype.hasOwnProperty);
  async function beforeWorkspacePacking(workspace, rawManifest) {
    const { project } = workspace;
    let updated = false;
    for (const dependencyType of DEPENDENCY_TYPES) {
      const descs = workspace.manifest.getForScope(dependencyType).values();
      for (const descriptor of descs) {
        if (!hasConditionProtocol(descriptor.range)) {
          continue;
        }
        const { test, consequent, alternate } = parseDescriptor(
          descriptor
        );
        const version = evaluateCondition(project, test) ? consequent : alternate;
        const ident = import_core6.structUtils.stringifyIdent(descriptor);
        const thisDepType = dependencyType === "dependencies" && !rawManifest["dependencies"][ident] && rawManifest["optionalDependencies"]?.[ident] ? "optionalDependencies" : dependencyType;
        if (version) {
          rawManifest[thisDepType][ident] = version;
          workspace.manifest.raw[thisDepType][ident] = version;
          workspace.manifest[dependencyType].set(
            descriptor.identHash,
            import_core6.structUtils.makeDescriptor(descriptor, version)
          );
        } else {
          delete rawManifest[thisDepType][ident];
          delete workspace.manifest.raw[thisDepType][ident];
          workspace.manifest[dependencyType].delete(descriptor.identHash);
        }
        updated = true;
      }
    }
    if (has(rawManifest, "conditions")) {
      updated = true;
      const conditions = rawManifest["conditions"];
      for (const [test, [consequent, alternate]] of Object.entries(conditions)) {
        const props = evaluateCondition(project, test) ? consequent : alternate;
        if (props) {
          for (const [key, value] of Object.entries(props)) {
            if (value === null)
              delete rawManifest[key];
            else
              rawManifest[key] = value;
          }
        }
      }
      delete rawManifest["conditions"];
    }
    if (updated) {
      await workspace.project.configuration.triggerHook(
        (hooks) => hooks.beforeWorkspacePacking,
        workspace,
        rawManifest
      );
    }
  }

  // sources/commands/materialize.ts
  var import_core7 = __require("@yarnpkg/core");
  var import_cli = __require("@yarnpkg/cli");
  var import_clipanion = __require("clipanion");
  var t = __toESM(__require("typanion"));
  var has2 = Function.call.bind(Object.prototype.hasOwnProperty);
  var hasDeep = (obj, prop, ...next) => has2(obj, prop) && (next.length === 0 || hasDeep(obj[prop], ...next));
  var MaterlializeCommand = class extends import_cli.BaseCommand {
    constructor() {
      super(...arguments);
      this.condition = import_clipanion.Option.String({ required: true });
      this.true = import_clipanion.Option.Boolean("--true", false);
      this.false = import_clipanion.Option.Boolean("--false", false);
    }
    async execute() {
      const { project, workspace, cache, configuration: configuration2 } = await this.getRoot();
      assertKnownCondition(project, this.condition);
      const value = this.false ? false : this.true ? true : evaluateCondition(project, this.condition);
      for (const ws of this.nestedWorkspaces(workspace, project)) {
        this.materializeCondition(value, ws);
      }
      const report = await import_core7.StreamReport.start(
        { configuration: configuration2, stdout: this.context.stdout, includeLogs: true },
        async (report2) => {
          await project.resolveEverything({ cache, report: report2 });
        }
      );
      if (report.hasErrors()) {
        return report.exitCode();
      }
      await project.persist();
    }
    *nestedWorkspaces(workspace, project) {
      yield workspace;
      for (const childCwd of workspace.workspacesCwds) {
        const childWorkspace = project.workspacesByCwd.get(childCwd);
        if (childWorkspace)
          yield* this.nestedWorkspaces(childWorkspace, project);
      }
    }
    materializeCondition(value, workspace) {
      for (const dependencyType of DEPENDENCY_TYPES) {
        const descs = workspace.manifest.getForScope(dependencyType).values();
        for (const descriptor of descs) {
          if (!hasConditionProtocol(descriptor.range)) {
            continue;
          }
          const { test, consequent, alternate } = parseDescriptor(
            descriptor
          );
          if (test !== this.condition)
            continue;
          const range = value ? consequent : alternate;
          if (range) {
            workspace.manifest[dependencyType].set(
              descriptor.identHash,
              import_core7.structUtils.makeDescriptor(descriptor, range)
            );
          } else {
            workspace.manifest[dependencyType].delete(descriptor.identHash);
          }
        }
      }
      const rawManifest = workspace.manifest.raw;
      if (hasDeep(rawManifest, "conditions", this.condition)) {
        const [consequent, alternate] = rawManifest["conditions"][this.condition];
        const props = value ? consequent : alternate;
        if (props) {
          for (const [key, value2] of Object.entries(props)) {
            if (value2 === null)
              delete rawManifest[key];
            else
              rawManifest[key] = value2;
          }
        }
        if (Object.keys(rawManifest["conditions"]).length === 1) {
          delete rawManifest["conditions"];
        } else {
          delete rawManifest["conditions"][this.condition];
        }
      }
    }
    async getRoot() {
      const configuration2 = await import_core7.Configuration.find(
        this.context.cwd,
        this.context.plugins
      );
      const [{ project, workspace }, cache] = await Promise.all([
        import_core7.Project.find(configuration2, this.context.cwd),
        import_core7.Cache.find(configuration2, { immutable: true })
      ]);
      return { configuration: configuration2, project, workspace, cache };
    }
  };
  MaterlializeCommand.paths = [
    ["condition", "materialize"]
  ];
  MaterlializeCommand.usage = import_clipanion.Command.Usage({
    description: "Evaluate and replace a condition in package.json files",
    details: `
      This command will replace all the occurrences of \`<condition>\` in the current workspace and in nested workspaces.

      The value of the condition (\`true\` or \`false\`) is based on the following sources, in descending priority order:

      - the \`--true\` or \`--false\` option;
      - the \`<condition>\` environment variable;
      - the default value specified in the Yarn configuration;
      - \`false\` by default.
    `
  });
  MaterlializeCommand.schema = [
    t.hasMutuallyExclusiveKeys(["true", "false"])
  ];

  // sources/index.ts
  var plugin = {
    configuration,
    commands: [MaterlializeCommand],
    fetchers: [ConditionFetcher],
    resolvers: [ConditionResolver],
    hooks: {
      beforeWorkspacePacking
    }
  };
  return __toCommonJS(sources_exports);
})();
return plugin;
}
};
