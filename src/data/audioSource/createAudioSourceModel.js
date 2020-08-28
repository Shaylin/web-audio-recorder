const storage = require("node-persist");

const NodePersistAudioSourceModel = require("./nodePersistAudioSourceModel");
const AudioSourceModel = require("./audioSourceModel");

module.exports = async () => {
	await storage.init();

	const nodePersistAudioSourceModel = new NodePersistAudioSourceModel();
	await nodePersistAudioSourceModel.init("audioSources", storage);

	return new AudioSourceModel(nodePersistAudioSourceModel);
};