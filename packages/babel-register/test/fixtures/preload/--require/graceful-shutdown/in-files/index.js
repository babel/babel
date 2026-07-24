// Begin reading from stdin so the process does not exit.
process.stdin.resume();

process.on('SIGINT', () => {
  console.log('graceful');
  process.exit(0);
});

if (process.platform === 'win32') {
  process.emit('SIGINT');
} else {
  process.kill(process.pid, 'SIGINT');
}
