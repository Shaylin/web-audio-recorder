const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");

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

	app.listen(3000, () => {
		console.log(`App listnering at http://localhost:3000`);
	});
}

main();