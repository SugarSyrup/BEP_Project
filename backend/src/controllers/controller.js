const db = require("../lib/db");

exports.getType = (req, res) => {
	const sql = `SELECT * FROM type;`;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).json({ err: err.message });
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
			return res.status(500).json({ err: err.message });
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
			return res.status(500).json({ err: err.message });
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
			return res.status(500).json({ err: err.message });
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
			return res.status(500).json({ err: err.message });
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
				return res.status(500).json({ err: err.message });
			}
			res.json(results);
		}
	);
};

exports.getAsksInfo = (req, res) => {
	const writer_name = req.query.writer_name;
	const password = req.query.password;
	const ask_id = req.query.ask_id;

	const sql = `SELECT * FROM asks
	WHERE ask_id = ? AND writer_name = ? AND password = ?`;

	db.query(sql, [ask_id, writer_name, password], (err, results) => {
		if (err) {
			return res.status(500).json({ err: err.message });
		}

		if (results.length === 0) {
			return res.json({ message: "Data not found" });
		} else {
			return res.json({ message: "Success" });
		}
	});
};

exports.postAsksDelete = (req, res) => {
	const writer_name = req.body.writer_name;
	const password = req.body.password;
	const ask_id = req.body.ask_id;

	const sql = `DELETE FROM asks
	WHERE ask_id = ? AND writer_name = ? AND password = ?`;

	db.query(sql, [ask_id, writer_name, password], (err, results) => {
		if (err) {
			return res.status(500).json({ err: err.message });
		}
		res.json(results);
	});
};

exports.postAsksModify = (req, res) => {
	const ask_id = req.body.ask_id;
	const title = req.body.title;
	const type_id = req.body.type_id;
	const content = req.body.content;
	const writer_name = req.body.writer_name;
	const password = req.body.password;

	const sql = `UPDATE asks
	SET type_id = ?, title = ?, writer_name = ?, password = ?, content = ?
	WHERE ask_id = ?`;

	db.query(
		sql,
		[type_id, title, writer_name, password, content, ask_id],
		(err, results) => {
			if (err) {
				return res.status(500).json({ err: err.message });
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
			return res.status(500).json({ err: err.message });
		}
		res.json(results);
	});
};

exports.getPolicyDetail = (req, res) => {
	const keywords = req.query.condition.keywords;
	const age = req.query.condition.age;
	const type = req.query.condition.type
		.map((t) => `'${t.trim()}'`)
		.join(", ");

	let age_condition = ` policy.target_min <= ${age}
	AND policy.target_max >= ${age} AND`;
	let type_condition = ` t.name IN (${type}) AND`;
	let keywords_condition = `${keywords
		.map((keywords) => ` policy.title LIKE '%${keywords.trim()}%'`)
		.join(" OR")}`;

	if (age === "") {
		age_condition = ``;
	}

	if (keywords === "") {
		keywords_condition = ``;
	}

	const sql =
		`SELECT *
	from policy
	left outer join type t on t.type_id = policy.type_id
	WHERE` +
		age_condition +
		type_condition +
		keywords_condition;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).json({ err: err.message });
		}
		res.json(results);
	});
};

exports.getSinglePolicy = (req, res) => {
	const policy_id = req.params.id;
	const sql = `SELECT *
	FROM policy
	left outer join type t on t.type_id = policy.type_id
	where policy_id = ?;`;

	db.query(sql, [policy_id], (err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	})	
}

exports.getComments = (req, res) => {
	const policy_id = req.params.id;
	const sql = `SELECT *
	from policy_comment
	where policy_id = ?;`;

	db.query(sql, [policy_id],(err, results) => {
		if (err) {
			return res.status(500), json({ err: err.message });
		}
		res.json(results);
	});
}

exports.postComment = (req, res) => {
	const policy_id = req.params.id;
	const writer_name = req.body.writer_name;
	const password = req.body.password;
	const content = req.body.comment;
	const sql = `insert into pollicy_comment (policy_id, writer_name, password, content)
	values (?, ?, ?, ?);`;

	db.query(
		sql,
		[policy_id, writer_name, password, content],
		(err, results) => {
			if (err) {
				return res.status(500), json({ err: err.message });
			}
			res.json(results);
		}
	);
};
