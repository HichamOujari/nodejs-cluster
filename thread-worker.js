const express = require("express");
const app = express();
const { Worker } = require("worker_threads");

app.get("/non-blocking", (req, res) => {
  console.log("====> new Request in : ", process.pid);
  res.send("Non blocking api");
});

app.get("/blocking", (req, res) => {
  const worker = new Worker("./service.js");

  worker.on("message", (message) => {
    res.status(200).send(`Blocking api (message = ${message})`);
  });

  worker.on("error", (error) => {
    res.status(500).send(`Blocking api (error = ${error})`);
  });
});

app.listen(3000, () => {
  console.log(
    `The application is starting with (port = 3000) (pid = ${process.pid})`
  );
});
