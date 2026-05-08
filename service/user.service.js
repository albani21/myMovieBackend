const User = require("../model/user.modle")

async function createUser(userInfo) {
	try {

		if (!await User.findOne({where: {username: userInfo.username}})) {


			const userResponse = await User.create(userInfo);

			console.log(userResponse);

			return userResponse;
		}
		return "user already exists"
	} catch (e) {
		throw new Error(e);
	}
}

async function getUserByID(id) {
	try {

		const userResponse = User.findByPk(id);

		console.log(userResponse);

		return userResponse;
	} catch (e) {
		throw new Error(e);
	}
}

async function getUserByEmail(email) {
	try {

		const userResponse = await User.findOne({where: {email: email}});

		console.log(userResponse);

		return userResponse;
	} catch (e) {
		throw new Error(e);
	}
}

async function deleteUser(email) {
	try {
		const userfound = await User.findOne({where: {email}});
		if (userfound) {

			const deltedUser = await User.destroy({where: {email: email}});

			return deltedUser > 0;
		}
	} catch (e) {
		console.error(e);
		throw new Error(e);
	}
}

async function updateUsername(oldUsername, newUsername) {
	const [affectedRows] = await User.update(
		{username: newUsername},
		{where: {username: oldUsername}}
	);

	return affectedRows > 0 ? "username updated successfully" : "no user found to update";
}

module.exports = {getUserByID, getUserByEmail, createUser, deleteUser, updateUsername};