const RecordingTaskService = require("./recordingTaskService");
const startRecordingTask = require("./startRecordingTask");
const modelFactory = require("../../model/factory/modelFactory");
const fs = require("fs");

module.exports = async function () {
    let recordingTaskService = new RecordingTaskService();

    const recordingTaskModel = await modelFactory.getRecordingTaskModel();
    const audioSourceModel = await modelFactory.getAudioSourceModel();

    recordingTaskService.init(recordingTaskModel, audioSourceModel, startRecordingTask, setInterval, postRecordingAction);

    return recordingTaskService;
};

async function postRecordingAction(recordingFilename) {
    if (!isObjectStorageEnabled) return;

    const clipStorageModel = await modelFactory.getClipStorageModel();

    console.log(`Performing post recording actions on ${recordingFilename}.`);

    clipStorageModel.uploadClip(recordingFilename).then(() => {
        if (process.env.DELETE_CLIPS_AFTERWARDS) {
            console.log(`Deleting ${recordingFilename}`);
            fs.unlinkSync(recordingFilename);
        }
    });
}

function isObjectStorageEnabled() {
    return process.env.OBJECT_STORAGE_ENABLED === "true";
}