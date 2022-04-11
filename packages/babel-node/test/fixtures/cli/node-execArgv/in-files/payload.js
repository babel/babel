const cluster = require("cluster");
console.log(typeof global.gc, cluster.isMaster);
if (cluster.isMaster) {
  cluster.fork();
} else {
  process.kill(process.pid);
}
