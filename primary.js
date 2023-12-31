const cluster = require("cluster");
const os = require("os");
const countCpus = os.cpus().length;
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

cluster.setupPrimary({
  exec: `${appDir}/index.js`,
});
for (let i = 0; i < countCpus; i++) cluster.fork();

cluster.on("exit", (worker) => cluster.foker());
