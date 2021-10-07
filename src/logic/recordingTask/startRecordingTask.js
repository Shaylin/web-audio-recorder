const childProcess = require("child_process");
const ffmpegPath = require("ffmpeg-static");

module.exports = function (recordingTask, url) {
	return new Promise((resolve, reject) => {
		let recordingName = getRecordingName(recordingTask);
		let durationInSeconds = recordingTask.duration * 60;

		console.log(`Starting recording for ${recordingName}`);

		childProcess.exec(`${ffmpegPath} -i ${url} -ac 1 -b:a 64K -t ${durationInSeconds} ${recordingName}`,
			{ encoding: "utf8" },
			(error) => {
				if (error && error.code) {
					reject(error);
				}
				else {
					resolve(recordingName);
				}
			});
	});
};

function getRecordingName(recordingTask) {
	let dateObject = new Date();
	let day = dateObject.getDate();
	let month = dateObject.getMonth() + 1;

	return `${recordingTask.audioSourceName}-${recordingTask.hour}h${recordingTask.minute}-${day}-${month}.mp3`;
}