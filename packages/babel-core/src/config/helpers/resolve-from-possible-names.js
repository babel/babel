import resolve from "./resolve";

export default function resolveFromPossibleNames(possibleNames: Array<string>, dirname: string): ?string {
  return possibleNames.reduce((accum, curr) => accum || resolve(curr, dirname), null);
}
