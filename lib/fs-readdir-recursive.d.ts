declare module "fs-readdir-recursive" {
  function read(
    root: string,
    filter?: (filename: string, index: number, dir: string) => boolean
  ): string[];
  export = read;
}
