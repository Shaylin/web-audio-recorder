const RecordingTaskService = require("./recordingTaskService");
const startRecordingTask = require("./startRecordingTask");

module.exports = function (recordingTaskModel, audioSourceModel) {
	let recordingTaskService = new RecordingTaskService();

	recordingTaskService.init(recordingTaskModel, audioSourceModel, startRecordingTask, setInterval);

	return recordingTaskService;
};