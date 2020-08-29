//const startRecordingTask = require("./startRecordingTask");

//TODO: Figure out who chains on the promise
module.exports = class RecordingTaskService {
	constructor(recordingTaskModel, audioSourceModel, clipStorageModel) {
		this.recordingTaskModel = recordingTaskModel;
		this.audioSourceModel = audioSourceModel;
		this.clipStorageModel = clipStorageModel;
	}
};