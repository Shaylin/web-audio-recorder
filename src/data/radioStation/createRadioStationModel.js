const storage = require("node-persist");

const NodePersistRadioStationModel = require("./nodePersistRadioStationModel");
const RadioStationModel = require("./radioStationModel");

module.exports = async () => {
	await storage.init();

	const nodePersistRadioStationModel = new NodePersistRadioStationModel();
	await nodePersistRadioStationModel.init("radioStations");

	return new RadioStationModel(nodePersistRadioStationModel);
};