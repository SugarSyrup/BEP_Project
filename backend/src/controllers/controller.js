const db = require("../lib/db");

exports.getType = (req, res) => {
	const sql = `SELECT * FROM type;`;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};

exports.getAsks = (req, res) => {
	const sql = `SELECT ask_id, t.type_id, t.name, title, created_at, recommendation
  FROM asks
  LEFT JOIN type t on asks.type_id = t.type_id
	ORDER BY ask_id DESC;`;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};

exports.getAsksTypeDetail = (req, res) => {
	const typeName = req.query.typeName;
	const sql = `SELECT ask_id, t.type_id, t.name, title, created_at, recommendation
  FROM asks
  LEFT JOIN type t on asks.type_id = t.type_id
	WHERE t.name = ?
	ORDER BY ask_id DESC;`;

	db.query(sql, [typeName], (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};

exports.getAsksDetail = (req, res) => {
	const askID = req.params.askID;
	const sql = `SELECT ask_id, writer_name, password, content
	FROM asks
	WHERE ask_id = ?;`;

	db.query(sql, [askID], (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};

exports.postAsksRecommendation = (req, res) => {
	const askID = req.params.askID;
	const recommendation = +req.query.recommendation + 1;
	const sql = `UPDATE asks
	SET recommendation = ?
	WHERE ask_id = ?;`;

	db.query(sql, [recommendation, askID], (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};

exports.postAsks = (req, res) => {
	const title = req.body.title;
	const type_id = req.body.type_id;
	const content = req.body.content;
	const writer_name = req.body.writer_name;
	const password = req.body.password;
	const sql = `insert into asks (type_id, title, writer_name, password, content)
	values (?, ?, ?, ?, ?);`;

	db.query(
		sql,
		[type_id, title, writer_name, password, content],
		(err, results) => {
			if (err) {
				return res.status(500), json({ err: err.message });
			}
			res.json(results);
		}
	);
};

//

exports.getPolicy = (req, res) => {
	const sql = `SELECT *
	from policy
	left outer join type t on t.type_id = policy.type_id;`;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
};
