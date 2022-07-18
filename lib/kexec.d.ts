declare module "kexec" {
  function execvp(cmd: string, args?: string[]): string;
  export = execvp;
}
