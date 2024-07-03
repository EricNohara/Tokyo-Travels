const express = require("express");
const fortune = require("./lib/fortune.js");
const app = express();
const handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 8000);
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about", {
    fortune: fortune.getFortune(),
    pageTestScript: "/qa/tests-about.js",
  });
});

app.get("/tours/sumida-river", (req, res) => {
  res.render("tours/sumida-river");
});

app.get("/tours/request-group-rate", (req, res) => {
  res.render("tours/request-group-rate");
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), () => {
  console.log("Express started on http://localhost:" + app.get("port"));
});
