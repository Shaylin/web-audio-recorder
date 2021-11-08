module.exports = (app, modelFactory, serviceFactory) => {
    app.get("/", (req, res) => {
        res.render("index", {title: "Web Audio Recorder", isAuthenticated: !!req.user});
    });

    app.get("/audioSources", async (req, res) => {
        const audioSourceModel = await modelFactory.getAudioSourceModel();
        const audioSourcesObjects = await audioSourceModel.getAudioSources();

        const audioSources = audioSourcesObjects.map(audioSource => audioSource.name);

        res.render("audioSources", {title: "Audio Sources", isAuthenticated: !!req.user, audioSources: audioSources});
    });

    app.get("/clipStorage", async (req, res) => {
        const clipStorageModel = await modelFactory.getClipStorageModel();
        const clips = await clipStorageModel.getClips();

        res.render("clipStorage", {title: "ClipStorage", isAuthenticated: !!req.user, audioClips: clips});
    });

    app.get("/recordingTasks", async (req, res) => {
        const recordingTaskModel = await modelFactory.getRecordingTaskModel();
        const recordingTaskService = await serviceFactory.getRecordingTaskService();
        const recordingTasks = await recordingTaskModel.getRecordingTasks();
        const activeTasks = await recordingTaskService.getActiveRecordingTaskIds();

        for (let activeTaskId of activeTasks) {
            for (let recordingTask of recordingTasks) {
                if (recordingTask.id === activeTaskId)
                {
                    recordingTask.active = true;
                }
            }
        }

        const audioSourceModel = await modelFactory.getAudioSourceModel();
        const audioSourcesObjects = await audioSourceModel.getAudioSources();
        const audioSources = audioSourcesObjects.map(audioSource => audioSource.name);

        res.render("recordingTasks", {title: "ClipStorage", isAuthenticated: !!req.user, recordingTasks: recordingTasks, audioSources: audioSources});
    });
};