const express = require("express");
const app = express();

app.get("/non-blocking", (req, res) => {
  console.log("====> new Request in : ", process.pid);
  res.send("Non blocking api");
});

app.get("/blocking", (req, res) => {
  let counter = 0;
  for (let i = 0; i < 2000000; i++) {
    counter++;
  }
  res.status(200).send(`Blocking api (message = ${counter})`);
});

app.listen(3000, () => {
  console.log(
    `The application is starting with (port = 3000) (pid = ${process.pid})`
  );
});
