const userService = require("../service/user.service");
const seedGen = require("../util/randomStr");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {hash} = require("bcrypt");
const {deleteUser} = require("../service/user.service");
const {Model} = require("sequelize");
require("dotenv").config()


async function login(req, res) {
	try {
		const {email, password} = req.body;
		const secret = process.env.JWT_SECRET;

		const user = await userService.getUserByEmail(email);
		console.log(user);

		if (!user) {
			return res.status(403).json({message: "user does not exist."});
		}


		const result = await bcrypt.compare(password, user.password);

		if (!result) {
			return res.status(401).json({message: "wrong credentials"});
		}

		const token = jwt.sign({email, dateNow: new Date()}, secret, {expiresIn: "2h"});
		return res.status(200).json({token});

	} catch (e) {
		console.error("Login error:", e);
		return res.status(500).json({error: "internal server error"});
	}
}

async function addUser(req, res) {
	try {
		const saltRounds = 10;
		const user = req.body;

		const seed = seedGen(4);

		const password = user.password;

		let userObj = {
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
		};

		const hashetPassword = await bcrypt.hash(password, saltRounds);

		if (!hashetPassword) {
			throw new Error("cna not ecrypte passowrd ");
		}
		userObj.password = hashetPassword;

		userObj.seed = seed;

		console.log(userObj);

		const userAdded = await userService.createUser(userObj)

		if (typeof userAdded === "string") {
			console.log(userAdded)
			return res.status(409).json({error: userAdded})
		}
		;

		if (!(userAdded instanceof Model)) {

			return res.status(500).json({error: "internal error"});
		}


		return res.status(201).json({user: userAdded, message: "user added"})

	} catch (e) {
		res.status(500).json({error: e.message})
		console.error(e.message)

	}

}

async function getUserByID(req, res) {
	try {

		const id = req.body.id;

		const user = await userService.getUserByID(id);

		if (!user) {
			res.status(404).json({message: "user does not exist "})
		}

		res.status(200).json({user: user});


	} catch (e) {
		res.status(500).json({error: e.message});
		console.error(e);


	}
}

async function getUserByEmail(req, res) {
	try {
		const email = req.query.email;  // ← was req.body.email
		console.log(email, "email from query");

		if (!email) {
			return res.status(400).json({message: "email is required."});
		}

		const user = await userService.getUserByEmail(email);

		if (!user) {
			return res.status(404).json({message: "user does not exist."});
		}

		user.password = "";
		return res.status(200).json({user});

	} catch (e) {
		console.error(e);
		return res.status(500).json({error: e.message});
	}
}

async function deleteUserByEmail(req, res) {
	const email = req.body.email;

	try {
		const deleteduser = await userService.deleteUser(email);


		if (!deleteduser) return res.status(500).json({error: "no use to delete "});

		res.status(200).json({message: "one user deleted"})


	} catch (e) {
		return res.status(500).json({error: e.message});
	}

}

async function updateUsername(req, res) {
	try {
		const {oldUsername, newUsername} = req.body;

		if (!oldUsername || !newUsername) {
			return res.status(400).json({error: "oldUsername and newUsername are required"});
		}

		const message = await userService.updateUsername(oldUsername, newUsername);
		return res.status(200).json({message});

	} catch (e) {
		console.error("Update username error:", e);
		return res.status(500).json({error: "internal server error"});
	}
}

module.exports = {login, addUser, getUserByID, getUserByEmail, deleteUserByEmail, updateUsername};