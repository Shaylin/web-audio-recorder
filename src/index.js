const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

const port = 3000;

const createRadioStationModel = require("./data/radioStation/createRadioStationModel.js");
const createRadioStationRoutes = require("./api/radioStation/createRadioStationRoutes.js");

function main() {
	initApplication().then(() => console.log("Application initialised"));
}

async function initApplication() {
	let radioStationModel = await createRadioStationModel();

	let allRadioStations = await radioStationModel.getRadioStations();
	console.log(allRadioStations);
    
	createRadioStationRoutes(app, radioStationModel);

	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname + "/view.html"));
	});

	app.listen(port, () => {
		console.log(`Example app listnering at http://localhost:${port}`);
	});
}

main();