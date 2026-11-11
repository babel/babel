interface Promise { pending: true }
type Map = Record<string, unknown>;
interface Error { code: number }
export { Promise, Map };
export default Error;
console.log("loaded");
