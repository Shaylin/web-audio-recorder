module.exports = class AudioSourceModel {
	constructor(adapter) {
		this.adapter = adapter;
	}

	/**
	* Retrieve an array of all raudio source objects currently stored in the model.
	* The audio source objects feature both a name and url string parameter.
	* @returns {Promise<Array>} A promise that resolves to an array of all raudio source objects.
	*/
	async getAudioSources() {
		return this.adapter.getAudioSources();
	}

	/**
	* Returns an audio source object with an expected name.
	* The audio source object features both a name and url string parameter.
	* @param {String} The name of the audio source to be retrieved. E.g. "Radio98"
	* @returns {Promise<Boolean>} A promise that resolves to the audio source with the requested name if it exists.
	* Otherwise returns a promise that resolves to null.
	*/
	async getAudioSource(name) {
		return this.adapter.getAudioSource(name);
	}

	/**
	* Add an audio source object to the model with a provided name and url.
	* @param {String} The name of the audio source to be added. E.g. "Radio98"
	* @param {String} The url of the audio source  to be added. E.g. "http://radio98.com"
	* @returns {Promise<Boolean>} A promise that resolves to true if adding the audio source is successful.
	* Otherwise returns a promise that resolves to false.
	*/
	async addAudioSource(name, url) {
		return this.adapter.addAudioSource(name, url);
	}

	/**
	* Update the url of an audio station in the model with an expected name.
	* @param {String} The name of the audio source to be updated. E.g. "Radio98"
	* @param {String} The new url of the audio source. E.g. "http://radio98.com"
	* @returns {Promise<Boolean>} A promise that resolves to true if updating the audio source is successful.
	* If the audio source does not exist in the model, it returns a promise that resolves to false.
	*/
	async updateAudioSource(name, url) {
		return this.adapter.updateAudioSource(name, url);
	}

	/**
	* Remove an audio source from the model with an expected name.
	* @param {String} The name of the audio source to be removed. E.g. "Radio98"
	* @returns {Promise<Boolean>} A promise that resolves to true if removing the audio source is successful.
	* If the audio source does not exist in the model, it returns a promise that resolves to false.
	*/
	async removeAudioSource(name) {
		return this.adapter.removeAudioSource(name);
	}
};