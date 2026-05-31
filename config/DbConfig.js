require("dotenv").config();
const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
	process.env.DB_NAME
	, process.env.DB_USERNAME
	, process.env.DB_PASSWORD
	, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false // Required for platforms like Heroku/Render/Neon unless you provide a CA cert
			}
		},
		logging: console.log
	});
