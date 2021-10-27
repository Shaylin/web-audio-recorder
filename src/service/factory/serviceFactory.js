const AudioSourceTesterService = require("../audioSource/audioSourceTesterService");
const createRecordingTaskService = require("../recordingTask/createRecordingTaskService");

class ServiceFactory {
    constructor() {
        this.audioSourceTesterService = null;
        this.recordingTaskService = null;
    }

    async getAudioSourceTesterService() {
        if (this.audioSourceTesterService == null) {
            this.audioSourceTesterService = new AudioSourceTesterService();
        }

        return this.audioSourceTesterService;
    }

    async getRecordingTaskService() {
        if (this.recordingTaskService == null) {
            this.recordingTaskService = createRecordingTaskService();
        }

        return this.recordingTaskService;
    }
}

module.exports = new ServiceFactory();
