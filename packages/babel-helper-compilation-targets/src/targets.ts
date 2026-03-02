export const unreleasedLabels = {
  safari: "tp",
} as const;

// Map from browserslist|@mdn/browser-compat-data browser names to @kangax/compat-table browser names
export const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ie_mob: "ie",
  ios_saf: "ios",
  node: "node",
  deno: "deno",
  op_mob: "opera_mobile",
  opera: "opera",
  safari: "safari",
  samsung: "samsung",
} as const;

export type BrowserslistBrowserName = keyof typeof browserNameMap;
