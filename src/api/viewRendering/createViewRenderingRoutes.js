module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", { title: "Web Audio Recorder", isAuthenticated: !!req.user });
    });

    app.get("/audioSources", (req, res) => {
        res.render("audioSources", { title: "Audio Sources" });
    });
};