export function getEnv(defaultValue = "development") {

  return process.env.BABEL_ENV
    || process.env.NODE_ENV
    || defaultValue;
}
