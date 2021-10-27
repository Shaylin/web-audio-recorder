module.exports = (app, modelFactory) => {
    app.get("/", (req, res) => {
        res.render("index", {title: "Web Audio Recorder", isAuthenticated: !!req.user});
    });

    app.get("/audioSources", async (req, res) => {
        const audioSourceModel = await modelFactory.getAudioSourceModel();
        const audioSourcesObjects = await audioSourceModel.getAudioSources();

        const audioSources = audioSourcesObjects.map(audioSource => audioSource.name);

        res.render("audioSources", {title: "Audio Sources", isAuthenticated: !!req.user, audioSources: audioSources});
    });

    app.get("/clipStorage", (req, res) => {
        res.render("clipStorage", {title: "ClipStorage", isAuthenticated: !!req.user});
    });

    app.get("/recordingTasks", (req, res) => {
        res.render("recordingTasks", {title: "ClipStorage", isAuthenticated: !!req.user});
    });
};