let express = require("express");
let serverless = require("serverless-http");

let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.append(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.append(
    "Access-Control-Allow-Methods",
    "GET,POST"
  );
  res.append(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );
  next();
});
let router = express.Router();

router.post("/", async (req, res) => {
  try {
    let name = req.body[0];
    res.send(name);
  } catch (error) {
    res.status(500);
    res.end(`Error: ${error}`);
    console.log(error);
  }
});

//console.log(`Listening on port ${port}.`);
//app.listen(port);
app.use("/.netlify/functions/testFunction", router);

module.exports.handler = serverless(app);
