const createAudioSourceModel = require("../audioSource/createAudioSourceModel");
const createRecordingTaskModel = require("../recordingTask/createRecordingTaskModel");
const createClipStorageModel = require("../clipStorage/createClipStorageModel");

class ModelFactory {
    constructor() {
        this.recordingTaskModel = null;
        this.audioSourceModel = null;
        this.clipStorageModel = null;
    }

    async getRecordingTaskModel() {
        if (this.recordingTaskModel == null) {
            this.recordingTaskModel = await createRecordingTaskModel();
        }

        return this.recordingTaskModel;
    }

    async getAudioSourceModel() {
        if (this.audioSourceModel == null) {
            this.audioSourceModel = await createAudioSourceModel();
        }

        return this.audioSourceModel;
    }

    async getClipStorageModel() {
        if (this.clipStorageModel == null) {
            this.clipStorageModel = await createClipStorageModel();
        }

        return this.clipStorageModel;
    }
}

module.exports = new ModelFactory();