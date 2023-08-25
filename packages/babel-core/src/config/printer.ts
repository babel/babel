import gensync from "gensync";

import type { Handler } from "gensync";

import type {
  OptionsAndDescriptors,
  UnloadedDescriptor,
} from "./config-descriptors.ts";

// todo: Use flow enums when @babel/transform-flow-types supports it
export const ChainFormatter = {
  Programmatic: 0,
  Config: 1,
};

type PrintableConfig = {
  content: OptionsAndDescriptors;
  type: (typeof ChainFormatter)[keyof typeof ChainFormatter];
  callerName: string | undefined | null;
  filepath: string | undefined | null;
  index: number | undefined | null;
  envName: string | undefined | null;
};

const Formatter = {
  title(
    type: (typeof ChainFormatter)[keyof typeof ChainFormatter],
    callerName?: string | null,
    filepath?: string | null,
  ): string {
    let title = "";
    if (type === ChainFormatter.Programmatic) {
      title = "programmatic options";
      if (callerName) {
        title += " from " + callerName;
      }
    } else {
      title = "config " + filepath;
    }
    return title;
  },
  loc(index?: number | null, envName?: string | null): string {
    let loc = "";
    if (index != null) {
      loc += `.overrides[${index}]`;
    }
    if (envName != null) {
      loc += `.env["${envName}"]`;
    }
    return loc;
  },

  *optionsAndDescriptors(opt: OptionsAndDescriptors) {
    const content = { ...opt.options };
    // overrides and env will be printed as separated config items
    delete content.overrides;
    delete content.env;
    // resolve to descriptors
    const pluginDescriptors = [...(yield* opt.plugins())];
    if (pluginDescriptors.length) {
      content.plugins = pluginDescriptors.map(d => descriptorToConfig(d));
    }
    const presetDescriptors = [...(yield* opt.presets())];
    if (presetDescriptors.length) {
      content.presets = [...presetDescriptors].map(d => descriptorToConfig(d));
    }
    return JSON.stringify(content, undefined, 2);
  },
};

function descriptorToConfig<API>(
  d: UnloadedDescriptor<API>,
): object | string | [string, unknown] | [string, unknown, string] {
  let name: object | string = d.file?.request;
  if (name == null) {
    if (typeof d.value === "object") {
      name = d.value;
    } else if (typeof d.value === "function") {
      // If the unloaded descriptor is a function, i.e. `plugins: [ require("my-plugin") ]`,
      // we print the first 50 characters of the function source code and hopefully we can see
      // `name: 'my-plugin'` in the source
      name = `[Function: ${d.value.toString().slice(0, 50)} ... ]`;
    }
  }
  if (name == null) {
    name = "[Unknown]";
  }
  if (d.options === undefined) {
    return name;
  } else if (d.name == null) {
    return [name, d.options];
  } else {
    return [name, d.options, d.name];
  }
}

export class ConfigPrinter {
  _stack: Array<PrintableConfig> = [];
  configure(
    enabled: boolean,
    type: (typeof ChainFormatter)[keyof typeof ChainFormatter],
    {
      callerName,
      filepath,
    }: {
      callerName?: string;
      filepath?: string;
    },
  ) {
    if (!enabled) return () => {};
    return (
      content: OptionsAndDescriptors,
      index?: number | null,
      envName?: string | null,
    ) => {
      this._stack.push({
        type,
        callerName,
        filepath,
        content,
        index,
        envName,
      });
    };
  }
  static *format(config: PrintableConfig): Handler<string> {
    let title = Formatter.title(
      config.type,
      config.callerName,
      config.filepath,
    );
    const loc = Formatter.loc(config.index, config.envName);
    if (loc) title += ` ${loc}`;
    const content = yield* Formatter.optionsAndDescriptors(config.content);
    return `${title}\n${content}`;
  }

  *output(): Handler<string> {
    if (this._stack.length === 0) return "";
    const configs = yield* gensync.all(
      this._stack.map(s => ConfigPrinter.format(s)),
    );
    return configs.join("\n\n");
  }
}
