/**
* A Model that stores recording tasks objects. These objects feature the following fields:
* @param {String} id The server generated unique id of this object. 
* @param {String} audioSourceName The name of the audio source that this task will record.
* @param {Int} dayOfWeek The day of the week that this task should run, where 0 is Sunday and 6 is Saturday.
* @param {Int} hour The hour of the day that this task should run from 0 to 23.
* @param {Int} minute The minute of the hour that this task should run from 0 to 59.
* @param {Int} duration The duration of the recording task in minutes.
*/
module.exports = class RecordingTaskModel {
	constructor(adapter) {
		this.adapter = adapter;
	}

	/**
	* Retrieve an array of all recording task objects currently stored in the model.
	* @returns {Promise<Array>} A promise that resolves to an array of all recording task objects.
	*/
	async getRecordingTasks() {
		return this.adapter.getRecordingTasks();
	}

	/**
	* Returns a recording task object with an expected id.
	* @param {String} id The unique string id of the recording task to be retrieved.
	* @returns {Promise<Boolean>} A promise that resolves to the recording task with the requested id if it exists.
	* Otherwise returns a promise that resolves to null.
	*/
	async getRecordingTask(id) {
		return this.adapter.getRecordingTask(id);
	}

	/**
	* Add a recording task object to the model.
	* @param {RecordingTask} recordingTask The recording task object to be added.
	* @returns {Promise<RecordingTask>} A promise that resolves to the added recording task object with a server-generated id.
	* Otherwise returns a promise that resolves to null.
	*/
	async addRecordingTask(recordingTask) {
		return this.adapter.addRecordingTask(recordingTask);
	}

	/**
	* Updates a recording task with a specified id.
	* @param {RecordingTask} recordingTask The recording task object to be added.
	* @returns {Promise<RecordingTask>} A promise that resolves to true if the task with the given id exists in the model.
	* Otherwise returns a promise that resolves to null.
	*/
	async updateRecordingTask(recordingTask) {
		return this.adapter.updateRecordingTask(recordingTask);
	}

	/**
	* Removed a recording task with a specified id.
	* @param {String} id The unique string id of the recording task to be removed.
	* @returns {Promise<RecordingTask>} A promise that resolves to true if the task with the given id exists in the model.
	* Otherwise returns a promise that resolves to null.
	*/
	async removeRecordingTask(id) {
		return this.adapter.removeRecordingTask(id);
	}
};