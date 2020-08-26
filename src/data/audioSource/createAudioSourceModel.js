const storage = require("node-persist");

const NodePersistAudioSourceModel = require("./nodePersistAudioSourceModel");
const AudioSourceModel = require("./audioSourceModel");

module.exports = async () => {
	await storage.init();

	const nodePersistRadioStationModel = new NodePersistAudioSourceModel();
	await nodePersistRadioStationModel.init("audioSources", storage);

	return new AudioSourceModel(nodePersistRadioStationModel);
};