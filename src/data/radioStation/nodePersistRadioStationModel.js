const storage = require("node-persist");

module.exports = class NodePersistRadioStationModel {
	async init(storageKey) {
		this.storageKey = storageKey;

		const storedRadioStations = await storage.get(storageKey);

		this.radioStations = new Map();

		if (!!storedRadioStations && storedRadioStations.length > 0) {
			storedRadioStations.forEach((radioStation) => {
				this.radioStations.set(radioStation.name, radioStation.url);
			});
		}
	}

	async getRadioStations() {
		let radioStationObjects = [];

		this.radioStations.forEach((value, key) => {
			radioStationObjects.push({ name: key, url: value });
		});

		return radioStationObjects;
	}

	async getRadioStation(name) {
		if (!this.radioStations.has(name)) return null;

		return { name: name, url: this.radioStations.get(name) };
	}

	async updateRadioStation(name, url) {
		if (!this.radioStations.has(name)) return false;

		this.radioStations.set(name, url);

		let radioStations = await this.getRadioStations();
		await storage.updateItem(this.storageKey, radioStations);

		return true;
	}

	async addRadioStation(name, url) {
		this.radioStations.set(name, url);

		let radioStations = await this.getRadioStations();
		await storage.updateItem(this.storageKey, radioStations);

		if (!this.radioStations.has(name)) return false;

		return true;
	}

	async removeRadioStation(name) {
		if (!this.radioStations.has(name)) return false;

		this.radioStations.delete(name);

		let radioStations = await this.getRadioStations();

		await storage.updateItem(this.storageKey, radioStations);

		return true;
	}
};