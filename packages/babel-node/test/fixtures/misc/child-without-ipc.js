if (process.send) {
  throw new Error('Unexpected IPC channel');
}
