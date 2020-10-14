const fs = require("fs");
const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.static("client/view/"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
const createClipStorageModel = require("./data/clipStorage/createClipStorageModel");

const AudioSourceTester = require("./logic/audioSource/audioSourceTester");
const createRecordingTaskService = require("./logic/recordingTask/createRecordingTaskService");

const createRecordingTaskRoutes = require("./api/recordingTask/createRecordingTaskRoutes");
const createAudioSourceRoutes = require("./api/audioSource/createAudioSourceRoutes");
const createClipStorageRoutes = require("./api/clipStorage/createClipStorageRoutes");

async function main() {	
	let clipStorageModel = createClipStorageModel();
	if (isObjectStorageEnabled) {
		createClipStorageRoutes(app, clipStorageModel);
	}

	let audioSourceModel = await createAudioSourceModel();
	let audioSourceTester = new AudioSourceTester();
	createAudioSourceRoutes(app, audioSourceModel, audioSourceTester);

	let postRecordingAction = (recordingFilename) => {
		if (!isObjectStorageEnabled) return;
		console.log(`Performing post recording actions on ${recordingFilename}.`);
		clipStorageModel.uploadClip(recordingFilename).then(() => {
			if (process.env.DELETE_CLIPS_AFTERWARDS) {
				console.log(`Deleting ${recordingFilename}`);
				fs.unlinkSync(recordingFilename);
			}
		});
	};

	let recordingTaskModel = await createRecordingTaskModel();
	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel, postRecordingAction);
	createRecordingTaskRoutes(app, recordingTaskModel, recordingTaskService);

	initApplication(process.env.PORT);
}

async function initApplication(port) {
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
}

function isObjectStorageEnabled(){
	return process.env.OBJECT_STORAGE_ENABLED === "true";
}

main();