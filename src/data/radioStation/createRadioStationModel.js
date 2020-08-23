const storage = require("node-persist");

const NodePersistRadioStationModel = require("./nodePersistRadioStationModel.js");
const RadioStationModel = require("./radioStationModel.js");

module.exports = async () => {
	await storage.init();

	const nodePersistRadioStationModel = new NodePersistRadioStationModel();
	await nodePersistRadioStationModel.init("radioStations");

	return new RadioStationModel(nodePersistRadioStationModel);
};