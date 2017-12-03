import * as FS from 'fs';

// Wraps a standard Node async function with a promise
// generating function
function wrap(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
      fn.apply(null, args);
    });
  };
}

export function exists(path) {
  return new Promise(resolve => {
    FS.exists(path, result => resolve(result));
  });
}

export const
  readFile = wrap(FS.readFile),
  close = wrap(FS.close),
  open = wrap(FS.open),
  read = wrap(FS.read),
  write = wrap(FS.write),
  rename = wrap(FS.rename),
  truncate = wrap(FS.truncate),
  rmdir = wrap(FS.rmdir),
  fsync = wrap(FS.fsync),
  mkdir = wrap(FS.mkdir),
  sendfile = wrap(FS.sendfile),
  readdir = wrap(FS.readdir),
  fstat = wrap(FS.fstat),
  lstat = wrap(FS.lstat),
  stat = wrap(FS.stat),
  readlink = wrap(FS.readlink),
  symlink = wrap(FS.symlink),
  link = wrap(FS.link),
  unlink = wrap(FS.unlink),
  fchmod = wrap(FS.fchmod),
  lchmod = wrap(FS.lchmod),
  chmod = wrap(FS.chmod),
  lchown = wrap(FS.lchown),
  fchown = wrap(FS.fchown),
  chown = wrap(FS.chown),
  utimes = wrap(FS.utimes),
  futimes = wrap(FS.futimes),
  writeFile = wrap(FS.writeFile),
  appendFile = wrap(FS.appendFile),
  realpath = wrap(FS.realpath);
