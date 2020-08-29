const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/client/view"));

const createRecordingTaskModel = require("./data/recordingTask/createRecordingTaskModel");
const startRecordingTask = require("./logic/recordingTask/startRecordingTask");

function main() {
	let url = "https://playerservices.streamtheworld.com/api/livestream-redirect/987FM_PREM.aac";
	let recordingTask = {
		audioSourceName: "987FM",
		hour: 2,
		minute: 30,
		duration: 1
	};

	startRecordingTask(recordingTask, url)
		.then((result) => console.log(`Finished recording ${result}`))
		.catch((error) => console.log(`Failed to record ${error}`));

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