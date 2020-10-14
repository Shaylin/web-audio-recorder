const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');

app.use(express.json());
app.use(express.static('client/view/'))

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
	if (isObjectStorageEnabled(objectStorageConfig)) {
		createClipStorageRoutes(app, clipStorageModel);
	}

	let audioSourceModel = await createAudioSourceModel();
	let audioSourceTester = new AudioSourceTester();
	createAudioSourceRoutes(app, audioSourceModel, audioSourceTester);

	let postRecordingAction = (recordingFilename) => {
		if (!isObjectStorageEnabled(objectStorageConfig)) return;
		console.log(`Performing post recording actions on ${recordingFilename}.`);
		clipStorageModel.uploadClip(recordingFilename).then(() => {
			if (serverConfig.deleteClipsAfterPostRecordingActions) {
				console.log(`Deleting ${recordingFilename}`);
				fs.unlinkSync(recordingFilename);
			}
		});
	};

	let recordingTaskModel = await createRecordingTaskModel();
	let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel, postRecordingAction);
	createRecordingTaskRoutes(app, recordingTaskModel, recordingTaskService);

	initApplication(serverConfig.port);
}

async function initApplication(port) {
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
}

function isObjectStorageEnabled(objectStorageConfig) {
	if (!objectStorageConfig) return false;
	return objectStorageConfig.enabled;
}

main();