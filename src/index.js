const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
const createRecordingTaskService = require("./logic/recordingTask/createRecordingTaskService");

async function main() {
	let audioSourceModel = await createAudioSourceModel();
	let recordingTaskModel = await createRecordingTaskModel();
	
	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel);
	console.log(`Active Recording Tasks: ${recordingTaskService.getActiveRecordingTaskIds()}`);

	initApplication().then(() => console.log("Application initialised"));
}

async function initApplication() {
	app.get("/", (req, res) => {
		res.render("index", { title: "Hellouwe", message: "Hello there!" });
	});

	app.listen(3000, () => {
		console.log("App listening at http://localhost:3000");
	});
}

main();