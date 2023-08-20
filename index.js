const express = require("express");
const app = express();

app.get("/non-blocking", (req, res) => {
  console.log("====> new Request in : ", process.pid);
  res.send("Non blocking api");
});

app.get("/blocking", (req, res) => {
  console.log("====> new Request in : ", process.pid);
  let counter = 0;
  for (let i = 0; i < 200000000000; i++) {
    counter++;
  }

  res.send(`Blocking api (counter = ${counter})`);
});

app.listen(3000, () => {
  console.log(`The application is starting with (port = 3000) (pid = ${process.pid})`);
});
