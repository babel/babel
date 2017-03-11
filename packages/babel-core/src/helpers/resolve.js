import resolve from "resolve";

export default function (loc: string, relative: string = process.cwd()): ?string {
  try {
    return resolve.sync(loc, { basedir: relative });
  } catch (err) {
    return null;
  }
}
