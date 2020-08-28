const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const AudioSourceTester = require("./logic/audioSource/audioSourceTester");

function main() {
	let audioSourceTester = new AudioSourceTester();
	audioSourceTester.testAudioSource({url: "https://playerservices.streamtheworld.com/api/livestream-redirect/987FM_PREM.aac"}).then((result) => console.log(result));

	initApplication().then(() => console.log("Application initialised"));
}

async function initApplication() {
	let recordingTaskModel = await createRecordingTaskModel();
	
	let recordingTasks = await recordingTaskModel.getRecordingTasks();
	console.log(recordingTasks);
	
	app.get("/", (req, res) => {
		res.render("index", { title: "Hellouwe", message: "Hello there!" });
	});

	app.listen(3000, () => {
		console.log("App listnering at http://localhost:3000");
	});
}

main();