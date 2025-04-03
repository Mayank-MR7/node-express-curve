const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from the Home page");
});

app.get("/about", (req, res) => {
  return res.send("Hello from the About Page");
});

app.listen(3000, () => console.log("Server Started!!!"));
