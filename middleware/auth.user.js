const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authenticate(req, res, next) {
	const authHeader = req.header("Authorization");

	if (!authHeader) {
		return res.status(401).json({message: "access denied no token"});
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;
		next();

	} catch (e) {
		return res.status(403).json({message: "no token provided"});

	}

}