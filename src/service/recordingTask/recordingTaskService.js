module.exports = class RecordingTaskService {
    constructor() {
        this.activeRecordingTaskIds = new Set();
    }

    init(recordingTaskModel, audioSourceModel, recordingMethod, pollingMethod, postRecordingAction) {
        this.recordingTaskModel = recordingTaskModel;
        this.audioSourceModel = audioSourceModel;
        this.recordingMethod = recordingMethod;
        this.postRecordingAction = postRecordingAction;

        pollingMethod(this.checkForTasksToExecute.bind(this), 10000);
    }

    async checkForTasksToExecute() {
        let date = new Date();
        let allRecordingTasks = await this.recordingTaskModel.getRecordingTasks();

        allRecordingTasks.forEach((recordingTask) => {
            if (this.activeRecordingTaskIds.has(recordingTask.id)) return;

            if (date.getHours() !== recordingTask.hour || date.getMinutes() !== recordingTask.minute) return;
			
            this.executeRecordingTask(recordingTask)
                .then((recordedFilename) => this.performPostRecordingTaskActions(recordingTask, recordedFilename));
        });
    }

    async executeRecordingTask(recordingTask) {
        this.activeRecordingTaskIds.add(recordingTask.id);

        let audioSource = await this.audioSourceModel.getAudioSource(recordingTask.audioSourceName);
        let url = audioSource.url;

        return this.recordingMethod(recordingTask, url);
    }

    performPostRecordingTaskActions(recordingTask, recordedFilename) {
        console.log(`Completed Recording ${recordedFilename}`);

        this.postRecordingAction(recordedFilename);

        this.activeRecordingTaskIds.delete(recordingTask.id);
    }

    getActiveRecordingTaskIds() {
        return Array.from(this.activeRecordingTaskIds);
    }
};