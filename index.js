const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.get("/non-blocking", (req, res) => {
  console.log("====> new Request in : ", process.pid);
  res.send("Non blocking api");
});

app.get("/blocking", (req, res) => {
  let counter = 0;
  for (let i = 0; i < 2000000000; i++) {
    counter++;
  }
  res.status(200).send(`Blocking api (message = ${counter})`);
});

app.listen(port, () => {
  console.log(
    `The application is starting with (port = 3000) (pid = ${process.pid})`
  );
});
