function f({ ...r }: any, C = (class { static saved = this.name }) as any) {
  return C.saved;
}

const { h = (function () {}) satisfies object, ...rest } = {} as any;
