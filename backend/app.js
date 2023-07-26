const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes/routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
