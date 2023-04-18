require("dotenv").config();
const cors = require("cors");
const chalk = require('chalk');

const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  console.log(chalk.whiteBright("<___Body Logger Start___>"));
  console.log(chalk.greenBright.bgWhiteBright(req.body));
  console.log(chalk.whiteBright("<___Body Logger End___>"));

  next();
});

const apiRouter = require("./api");
app.use("/api", apiRouter);


app.use((error, req, res, next) => {
  res.send({
    error: error.error,
    message: error.message,
  });
});


app.get('*', async (req, res) => {
  res.status(404).send({
      error: 'Page not found',
      message: 'The page you are looking for was not found'
  });
});

const PORT = process.env["PORT"] ?? 4000;

app.listen(PORT, () => {
  console.log(
    chalk.blueBright("Server is listening on"),
    chalk.bold.yellowBright('PORT :', PORT),
    chalk.blueBright("Pokemon are cool!")
  );
});
