const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

const authenticationStrategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
);

const app = express();

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

app.use(express.json());
app.set("view engine", "pug");
app.set("views", "client/view/");
app.use(express.static("client/view/"));

app.use(expressSession(session));

passport.use(authenticationStrategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const modelFactory = require("./model/factory/modelFactory");
const serviceFactory = require("./service/factory/serviceFactory");

const createRecordingTaskRoutes = require("./api/recordingTask/createRecordingTaskRoutes");
const createAudioSourceRoutes = require("./api/audioSource/createAudioSourceRoutes");
const createClipStorageRoutes = require("./api/clipStorage/createClipStorageRoutes");
const createViewRenderingRoutes = require("./api/viewRendering/createViewRenderingRoutes");

async function main() {
    let clipStorageModel = await modelFactory.getClipStorageModel();
    if (isObjectStorageEnabled) {
        //TODO: Eventually configure these to use the factories directly
        createClipStorageRoutes(app, clipStorageModel);
    }

    let audioSourceModel = await modelFactory.getAudioSourceModel();
    let audioSourceTester = await serviceFactory.getAudioSourceTesterService();
    createAudioSourceRoutes(app, audioSourceModel, audioSourceTester);

    let recordingTaskModel = await modelFactory.getRecordingTaskModel();
    let recordingTaskService = await serviceFactory.getRecordingTaskService();
    createRecordingTaskRoutes(app, recordingTaskModel, recordingTaskService);

    createViewRenderingRoutes(app, modelFactory, serviceFactory);

    app.use("/", require("./api/authentication/authenticationRouter"));

    initApplication(process.env.PORT);
}

function initApplication(port) {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

function isObjectStorageEnabled() {
    return process.env.OBJECT_STORAGE_ENABLED === "true";
}

main();