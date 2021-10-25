const RecordingTaskService = require("./recordingTaskService");
const startRecordingTask = require("./startRecordingTask");

module.exports = function (recordingTaskModel, audioSourceModel, postRecordingAction) {
    let recordingTaskService = new RecordingTaskService();

    recordingTaskService.init(recordingTaskModel, audioSourceModel, startRecordingTask, setInterval, postRecordingAction);

    return recordingTaskService;
};