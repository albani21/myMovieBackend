const express = require('express');
const {configDotenv} = require("dotenv");
configDotenv()
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require("./config/DbConfig");
const authRouter = require("./router/user.routes");


const PORT = process.env.SERVER_PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);

app.listen(PORT, async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({force: true});
		console.log("the DATA BASE is RUNNING...")
		console.log("the server is listening in PORT ", PORT)
	} catch (e) {

	}
});