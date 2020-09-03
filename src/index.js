const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
const createRecordingTaskService = require("./logic/recordingTask/createRecordingTaskService");
const createClipStorageModel = require("./data/clipStorage/createClipStorageModel");

async function main() {
	let audioSourceModel = await createAudioSourceModel();
	let recordingTaskModel = await createRecordingTaskModel();
	
	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel);
	console.log(`Active Recording Tasks: ${recordingTaskService.getActiveRecordingTaskIds()}`);

	let objectStorageConfig = JSON.parse(fs.readFileSync("serverConfig.json", "utf-8")).objectStorageSettings;
	
	let clipStorage = createClipStorageModel(objectStorageConfig);

	//TODO: Make the model parse the stream and resolve to a json array once the stream ends
	clipStorage.getClips().then((clipStream) => {
		clipStream.on("data", (data) => {
			console.log(data);
		});

		clipStream.on("end", () => {
			console.log("Stream ended");
		});
	});

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