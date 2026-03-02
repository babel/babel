export default function makeNoopPlugin() {
  let p;
  return ((p = (() => ({})) as any).default = p);
}
