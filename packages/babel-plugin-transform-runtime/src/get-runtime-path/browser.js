export default function (moduleName, dirname, absoluteRuntime) {
  if (absoluteRuntime === false) return moduleName;

  throw new Error(
    "The 'absoluteRuntime' option is not supported when using @babel/standalone.",
  );
}
