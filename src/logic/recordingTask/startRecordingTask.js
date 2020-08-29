const childProcess = require("child_process");

//TODO: This thing returns a promise that we chain off - I guess the recording task service holds task ids to promises
//TODO: if the promise is resolved - we know the thing is inactive - otherwise active
module.exports = function(recordingTask, url) {
	return new Promise((resolve, reject) => {
		let recordingName = getRecordingName(recordingTask);
		let durationInSeconds = recordingTask.duration * 60;

		childProcess.exec(`ffmpeg -i ${url} -ac 1 -b:a 32K -t ${durationInSeconds} ${recordingName}`,
			{encoding: "utf8"},
			(error) => {
				if (error && error.code)
				{
					reject(error);
				}
				else
				{
					resolve(recordingName);
				}
			});
	});
};

function getRecordingName(recordingTask) {
	let dateObject = new Date();
	let day = dateObject.getDate();
	let month = dateObject.getMonth() + 1;
	
	return `${recordingTask.audioSourceName}-${recordingTask.hour}h${recordingTask.minute}-${day}-${month}.ogg`; 
}