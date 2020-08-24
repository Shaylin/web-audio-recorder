module.exports = class RadioStationModel {
	constructor(adapter) {
		this.adapter = adapter;
	}

	/**
	* Retrieve an array of all radio station objects currently stored in the model.
	* The radio station objects feature both a name and url string parameter.
	* @returns {Promise<Array>} A promise that resolves to an array of all radio station objects.
	*/
	async getRadioStations() {
		return this.adapter.getRadioStations();
	}

	/**
	* Returns a radio station object with an expected name.
	* The radio station object features both a name and url string parameter.
	* @param {String} The name of the radio station to be retrieved. E.g. "Radio98"
	* @returns {Promise<Boolean>} A promise that resolves to radio station with the requested name if it exists.
	* Otherwise returns a promise that resolves to null.
	*/
	async getRadioStation(name) {
		return this.adapter.getRadioStation(name);
	}

	/**
	* Add a radio station object to the model with a provided name and url.
	* @param {String} The name of the radio station to be added. E.g. "Radio98"
	* @param {String} The url of the radio station to be added. E.g. "http://radio98.com"
	* @returns {Promise<Boolean>} A promise that resolves to true if adding the station is successful.
	* Otherwise returns a promise that resolves to false.
	*/
	async addRadioStation(name, url) {
		return this.adapter.addRadioStation(name, url);
	}

	/**
	* Update the url of a radio station in the model with an expected name.
	* @param {String} The name of the radio station to be updated. E.g. "Radio98"
	* @param {String} The new url of the radio station. E.g. "http://radio98.com"
	* @returns {Promise<Boolean>} A promise that resolves to true if updating the station is successful.
	* If the station does not exist in the model, it returns a promise that resolves to false.
	*/
	async updateRadioStation(name, url) {
		return this.adapter.updateRadioStation(name, url);
	}

	/**
	* Remove a radio station from the model with an expected name.
	* @param {String} The name of the radio station to be removed. E.g. "Radio98"
	* @returns {Promise<Boolean>} A promise that resolves to true if removing the station is successful.
	* If the station does not exist in the model, it returns a promise that resolves to false.
	*/
	async removeRadioStation(name) {
		return this.adapter.removeRadioStation(name);
	}
};