/**
* A Model that stores the names of the recorded audio clip objects.
* These objects feature the following fields:
* @param {String} name The name of the recorded audio clip file.
* @param {Int} fileSize The file size in KB.
* @param {String} lastModified The date that this file was last modified on.
*/
module.exports = class ClipStorageModel {
	constructor(adapter) {
		this.adapter = adapter;
	}

	/**
	* Retrieve an array of all of the recorded audio clip objects stored.
	* @returns {Promise<Array>} A promise that resolves to an array of audio clip objects.
	*/
	async getClips() {
		return this.adapter.getClips();
	}

	/**
	* Retrieves a download link for a single audio clip file with a specified name.
	* @param {String} name The full filename of the clip to be downloaded.
	* @returns {Promise<String>} A promise that resolves to a download url for the given audio clip.
	*/
	async getClipDownloadLink(name) {
		return this.adapter.getClipDownloadLink(name);
	}

	/**
	* Uploads a clip with the given path and name to object storage.
	* @param {String} name The full path and name of the clip to be uploaded.
	* @returns {Promise<String>} A promise that resolves to true if the upload is successful.
	* Otherwise returns a promise that resolves to false.
	*/
	async uploadClip(name) {
		return this.adapter.uploadClip(name);
	}

	/**
	* Deleted the audio clip file with the specified name.
	* @param {String} name The full filename of the clip to be deleted.
	* @returns {Promise<Boolean>} A promise that resolves to true if the deletion is successful.
	* Otherwise returns a promise that resolves to false.
	*/
	async deleteClip(name) {
		return this.adapter.getClipDownloadLink(name);
	}
};