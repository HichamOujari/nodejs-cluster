const cluster = require("cluster");
const os = require("os");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const countCpus = os.cpus().length;

cluster.setupPrimary({
  exec: `${appDir}/index.js`,
});
for (let i = 0; i < countCpus; i++) cluster.fork();

cluster.on("exit", (worker) => cluster.foker());
