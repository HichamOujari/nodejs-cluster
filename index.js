const express = require("express");
const app = express();

const cluster = require("cluster");
const os = require("os");
const countCpus = os.cpus().length;

if(cluster.isMaster) {
  for (let i = 0; i < countCpus; i++)  cluster.fork();
  cluster.on("exit", (worker) => cluster.foker());
}
else {
  const port = process.env.port || 3000;

  app.get("/non-blocking", (req, res) => {
    res.send("Non blocking api");
  });
  
  app.get("/blocking", (req, res) => {
    let counter = 0;
    for (let i = 0; i < 20000000000; i++) {
      counter++;
    }
    res.status(200).send(`Blocking api (message = ${counter})`);
  });
  
  app.listen(port, () => {
    console.log(
      `The application is starting with (port = ${port}) (pid = ${process.pid})`
    );
  });
}