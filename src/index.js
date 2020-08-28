const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

// const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
// const createAudioSourceRoutes = require("./api/audioSource/createAudioSourceRoutes");
const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");

function main() {
	initApplication().then(() => console.log("Application initialised"));
}

async function initApplication() {
	let recordingTaskModel = await createRecordingTaskModel();
	
	let recordingTasks = await recordingTaskModel.getRecordingTasks();
	console.log(recordingTasks);

	// createAudioSourceRoutes(app, audioSourceModel);

	app.get("/", (req, res) => {
		res.render("index", { title: "Hellouwe", message: "Hello there!" });
	});

	app.listen(3000, () => {
		console.log("App listnering at http://localhost:3000");
	});
}

main();