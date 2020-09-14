const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
const createClipStorageModel = require("./data/clipStorage/createClipStorageModel");

const AudioSourceTester = require("./logic/audioSource/audioSourceTester");
const createRecordingTaskService = require("./logic/recordingTask/createRecordingTaskService");

const createRecordingTaskRoutes = require("./api/recordingTask/createRecordingTaskRoutes");
const createAudioSourceRoutes = require("./api/audioSource/createAudioSourceRoutes");
const createClipStorageRoutes = require("./api/clipStorage/createClipStorageRoutes");

async function main() {
	let serverConfig = JSON.parse(fs.readFileSync("serverConfig.json", "utf-8"));
	
	let objectStorageConfig = serverConfig.objectStorageSettings;
	let clipStorageModel = createClipStorageModel(objectStorageConfig);

	let postRecordingAction = (recordingFilename) => {
		if (!isObjectStorageEnabled(objectStorageConfig)) return;
		console.log(`Performing post recording actions on ${recordingFilename}.`);
		clipStorageModel.uploadClip(recordingFilename);
	};

	let audioSourceModel = await createAudioSourceModel();
	let recordingTaskModel = await createRecordingTaskModel();

	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel, postRecordingAction);
	let audioSourceTester = new AudioSourceTester();

	createAudioSourceRoutes(app, audioSourceModel, audioSourceTester);
	createClipStorageRoutes(app, clipStorageModel);
	createRecordingTaskRoutes(app, recordingTaskModel, recordingTaskService);

	initApplication(serverConfig.port);
}

async function initApplication(port) {
	app.get("/", (req, res) => {
		res.render("index", { title: "Hellouwe", message: "Hello there!" });
	});

	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
}

//TODO: Fix this thing - reorganise the way things spin up
function isObjectStorageEnabled(objectStorageConfig) {
	if (!objectStorageConfig) return false;
	return objectStorageConfig.enabled;
}

main();