import runner from "@babel/helper-plugin-test-runner";

process.env.BABEL_ENV = "env-from-preset";

runner(__dirname);
