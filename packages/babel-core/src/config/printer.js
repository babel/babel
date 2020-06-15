// @flow

import type { OptionsAndDescriptors } from "./config-descriptors";

// todo: Use flow enums when @babel/transform-flow-types supports it
export const ChainFormatter = {
  Programmatic: 0,
  Config: 1,
};

type PrintableConfig = {
  content: OptionsAndDescriptors,
  type: $Values<typeof ChainFormatter>,
  callerName: ?string,
  filepath: ?string,
  index: ?number,
  envName: ?string,
};

const Formatter = {
  title(
    type: $Values<typeof ChainFormatter>,
    callerName: ?string,
    filepath: ?string,
  ): string {
    let title = "";
    if (type === ChainFormatter.Programmatic) {
      title = "programmatic options";
      if (callerName) {
        title += " from " + callerName;
      }
    } else {
      // $FlowIgnore
      title = "config " + filepath;
    }
    return title;
  },
  loc(index: ?number, envName: ?string): string {
    let loc = "";
    if (index != null) {
      loc += `.overrides[${index}]`;
    }
    if (envName != null) {
      loc += `.env["${envName}"]`;
    }
    return loc;
  },
  optionsAndDescriptors(opt: OptionsAndDescriptors) {
    const content = { ...opt.options };
    // overrides and env will be printed as separated config items
    delete content.overrides;
    delete content.env;
    return JSON.stringify(content, undefined, 2);
  },
};

export class ConfigPrinter {
  _stack: Array<PrintableConfig> = [];
  configure(
    enabled: boolean,
    type: $Values<typeof ChainFormatter>,
    { callerName, filepath }: { callerName?: string, filepath?: string },
  ) {
    if (!enabled) return () => {};
    return (
      content: OptionsAndDescriptors,
      index: ?number,
      envName: ?string,
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
  static format(config: PrintableConfig): string {
    let title = Formatter.title(
      config.type,
      config.callerName,
      config.filepath,
    );
    const loc = Formatter.loc(config.index, config.envName);
    if (loc) title += ` ${loc}`;
    const content = Formatter.optionsAndDescriptors(config.content);
    return `${title}\n${content}`;
  }

  output(): string {
    if (this._stack.length === 0) return "";
    return this._stack.map(s => ConfigPrinter.format(s)).join("\n\n");
  }
}
