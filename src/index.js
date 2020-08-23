const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set('views', path.join(__dirname, '/client/view'));

const createRadioStationModel = require("./data/radioStation/createRadioStationModel.js");
const createRadioStationRoutes = require("./api/radioStation/createRadioStationRoutes.js");

function main() {
	initApplication().then(() => console.log("Application initialised"));
}

async function initApplication() {
	let radioStationModel = await createRadioStationModel();

	let allRadioStations = await radioStationModel.getRadioStations();

	createRadioStationRoutes(app, radioStationModel);

	app.get("/", (req, res) => {
		res.render('index', { title: 'Hey', message: 'Hello there!' })
	});

	app.listen(3000, () => {
		console.log(`App listnering at http://localhost:3000`);
	});
}

main();