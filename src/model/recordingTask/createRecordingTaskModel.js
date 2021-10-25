const storage = require("node-persist");
const { v4: uuidv4 } = require("uuid");

const NodePersistRecordingTaskModel = require("./nodePersistRecordingTaskModel");
const RecordingTaskModel = require("./recordingTaskModel");

module.exports = async () => {
    await storage.init();

    const nodePersistRecordingTaskModel = new NodePersistRecordingTaskModel();
    await nodePersistRecordingTaskModel.init("recordingTasks", storage, uuidv4);

    return new RecordingTaskModel(nodePersistRecordingTaskModel);
};