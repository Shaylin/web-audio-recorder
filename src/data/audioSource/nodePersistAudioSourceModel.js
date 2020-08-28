module.exports = class NodePersistAudioSourceModel {
	async init(storageKey, storage) {
		this.storageKey = storageKey;
		this.storage = storage;

		const storedAudioSources = await this.storage.get(this.storageKey);

		this.audioSources = new Map();

		if (!!storedAudioSources && storedAudioSources.length > 0) {
			storedAudioSources.forEach((audioSource) => {
				this.audioSources.set(audioSource.name, audioSource.url);
			});
		}
	}

	async getAudioSources() {
		let audioSourceObjects = [];

		this.audioSources.forEach((value, key) => {
			audioSourceObjects.push({ name: key, url: value });
		});

		return audioSourceObjects;
	}

	async getAudioSource(name) {
		if (!this.audioSources.has(name)) return null;

		return { name: name, url: this.audioSources.get(name) };
	}

	async updateAudioSource(name, url) {
		if (!this.audioSources.has(name)) return false;

		this.audioSources.set(name, url);

		let audioSources = await this.getAudioSources();
		await this.storage.updateItem(this.storageKey, audioSources);

		return true;
	}

	async addAudioSource(name, url) {
		this.audioSources.set(name, url);

		let audioSources = await this.getAudioSources();
		await this.storage.updateItem(this.storageKey, audioSources);

		if (!this.audioSources.has(name)) return false;

		return true;
	}

	async removeAudioSource(name) {
		if (!this.audioSources.has(name)) return false;

		this.audioSources.delete(name);

		let audioSources = await this.getAudioSources();
		await this.storage.updateItem(this.storageKey, audioSources);

		return true;
	}
};