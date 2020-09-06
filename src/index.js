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
	let objectStorageConfig = JSON.parse(fs.readFileSync("serverConfig.json", "utf-8")).objectStorageSettings;
	let clipStorage = createClipStorageModel(objectStorageConfig);

	let postRecordingAction = (recordingFilename) => {
		if (!isObjectStorageConfigValid(objectStorageConfig)) return;
		console.log(`Performing post recording actions on ${recordingFilename}.`);
		clipStorage.uploadClip(recordingFilename);
	};

	let audioSourceModel = await createAudioSourceModel();
	let recordingTaskModel = await createRecordingTaskModel();

	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel, postRecordingAction);

	let activeIds = recordingTaskService.getActiveRecordingTaskIds();
	console.log(activeIds);
 
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

function isObjectStorageConfigValid(objectStorageConfig) {
	if (!objectStorageConfig) return false;
	if (typeof (objectStorageConfig.endPoint) != "string") return false;
	if (typeof (objectStorageConfig.accessKey) != "string") return false;
	if (typeof (objectStorageConfig.secretKey) != "string") return false;
	if (typeof (objectStorageConfig.bucketName) != "string") return false;

	return true;
}

main();