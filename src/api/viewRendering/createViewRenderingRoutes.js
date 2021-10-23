module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", { title: "Web Audio Recorder", isAuthenticated: !!req.user });
    });

    app.get("/audioSources", (req, res) => {
        res.render("audioSources", { title: "Audio Sources", isAuthenticated: !!req.user  });
    });

    app.get("/clipStorage", (req, res) => {
        res.render("clipStorage", { title: "ClipStorage", isAuthenticated: !!req.user  });
    });

    app.get("/recordingTasks", (req, res) => {
        res.render("recordingTasks", { title: "ClipStorage", isAuthenticated: !!req.user  });
    });
};