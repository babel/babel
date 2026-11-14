await Promise.resolve();

export default function myConfig() {
  throw new Error("Error inside async config!");
}
