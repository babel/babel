type BabelParserOptions = {
  strictMode?: boolean;
  looseModules?: boolean;
  highlightCode?: boolean;
  nonStandard?: boolean;
  sourceType?: "module" | "script";
  filename?: string;
  features?: Object;
  plugins?: Object;
};
