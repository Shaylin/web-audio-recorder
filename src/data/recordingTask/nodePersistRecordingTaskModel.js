module.exports = class NodePersistRecordingTaskModel {
	async init(storageKey, storage, uuidGenerator) {
		this.storageKey = storageKey;
		this.storage = storage;
		this.uuidGenerator = uuidGenerator;

		const storedRecordingTasks = await this.storage.get(this.storageKey);

		this.recordingTasks = new Map();

		if (!!storedRecordingTasks && storedRecordingTasks.length > 0) {
			storedRecordingTasks.forEach((recordingTask) => {
				this.recordingTasks.set(recordingTask.id, recordingTask);
			});
		}
	}

	async getRecordingTasks() {
		let recordingTaskObjects = [];

		this.recordingTasks.forEach((value) => {
			recordingTaskObjects.push(value);
		});

		return recordingTaskObjects;
	}

	async getRecordingTask(id) {
		return this.recordingTasks.get(id);
	}

	async updateRecordingTask(recordingTask) {
		if (!this.recordingTasks.has(recordingTask.id)) return false;

		this.recordingTasks.set(recordingTask.id, recordingTask);

		let recordingTasks = await this.getRecordingTasks();
		await this.storage.updateItem(this.storageKey, recordingTasks);

		return true;
	}

	async addRecordingTask(recordingTask) {
		let uuid = this.uuidGenerator();
		let recordingTaskToAdd = {id: uuid};
		Object.assign(recordingTaskToAdd, recordingTask);

		this.recordingTasks.set(uuid, recordingTaskToAdd);

		let recordingTasks = await this.getRecordingTasks();
		console.log(`Setting ${recordingTasks}`);
		await this.storage.updateItem(this.storageKey, recordingTasks);

		if (!this.recordingTasks.has(recordingTask.id)) return false;

		return true;
	}

	async removeRecordingTask(id) {
		if (!this.recordingTasks.has(id)) return false;

		this.recordingTasks.delete(id);

		let recordingTasks = await this.getRecordingTasks();
		await this.storage.updateItem(this.storageKey, recordingTasks);

		return true;
	}
};