/**
 * Required External Modules
 */
const fs = require("fs");
const express = require("express");

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

const authRouter = require("./auth");

const createViewRenderingRoutes = require("./api/viewRendering/createViewRenderingRoutes");

/**
 * App Variables
 */
const app = express();

/**
 * Session Configuration
 */
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

/**
 * Passport Configuration
 */
const strategy = new Auth0Strategy(
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

/**
 * App Configuration
 */
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "client/view/");
app.use(express.static("client/view/"));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

createViewRenderingRoutes(app);

app.use("/", authRouter);


/**
 * App Startup
 */
const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const createAudioSourceModel = require("./data/audioSource/createAudioSourceModel");
const createClipStorageModel = require("./data/clipStorage/createClipStorageModel");

const AudioSourceTester = require("./logic/audioSource/audioSourceTester");
const createRecordingTaskService = require("./logic/recordingTask/createRecordingTaskService");

const createRecordingTaskRoutes = require("./api/recordingTask/createRecordingTaskRoutes");
const createAudioSourceRoutes = require("./api/audioSource/createAudioSourceRoutes");
const createClipStorageRoutes = require("./api/clipStorage/createClipStorageRoutes");

async function main() {
    let clipStorageModel = createClipStorageModel();
    if (isObjectStorageEnabled) {
        createClipStorageRoutes(app, clipStorageModel);
    }

    let audioSourceModel = await createAudioSourceModel();
    let audioSourceTester = new AudioSourceTester();
    createAudioSourceRoutes(app, audioSourceModel, audioSourceTester);

    let postRecordingAction = (recordingFilename) => {
        if (!isObjectStorageEnabled) return;
        console.log(`Performing post recording actions on ${recordingFilename}.`);
        clipStorageModel.uploadClip(recordingFilename).then(() => {
            if (process.env.DELETE_CLIPS_AFTERWARDS) {
                console.log(`Deleting ${recordingFilename}`);
                fs.unlinkSync(recordingFilename);
            }
        });
    };

    let recordingTaskModel = await createRecordingTaskModel();
    let recordingTaskService = createRecordingTaskService(recordingTaskModel, audioSourceModel, postRecordingAction);
    createRecordingTaskRoutes(app, recordingTaskModel, recordingTaskService);

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