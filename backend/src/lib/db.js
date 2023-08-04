const mysql = require("mysql");
const config = require("./config.json");

let db;
function handleDisconnect() {
	db = mysql.createConnection(config.db);

	db.connect(function (err) {
		if (err) {
			console.error("Error connecting to database:", err);
			setTimeout(handleDisconnect, 2000); // 2초 후에 다시 시도
		}
	});

	db.on("error", function (err) {
		console.error("Database error:", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		} else {
			throw err;
		}
	});
}

handleDisconnect();
module.exports = db;
