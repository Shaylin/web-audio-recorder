const RecordingTaskModel = require("../../../src/data/recordingTask/recordingTaskModel");

describe("RecordingTaskModel", () => {
    let recordingTaskModel = null;
    let mockRecordingTaskModelAdapter = null;

    const task1 = {
        id: "222",
        audioSourceName: "Class95",
        hour: 9,
        minute: 10,
        duration: 60
    };

    const task2 = {
        id: "3",
        audioSourceName: "Money98",
        hour: 14,
        minute: 30,
        duration: 120
    };

    const task3 = {
        id: "323",
        audioSourceName: "Money98",
        hour: 8,
        minute: 0,
        duration: 240
    };

    const allRecordingTasks = [task1, task2];

    beforeEach(() => {
        mockRecordingTaskModelAdapter = getMockRecordingTaskModelAdapter();
        recordingTaskModel = new RecordingTaskModel(mockRecordingTaskModelAdapter);
    });

    describe("Constructor", () => {
        it("Should construct", () => {
            expect(recordingTaskModel).not.toBe(null);
        });
    });

    describe("getRecordingTasks", () => {
        it("Should return the value from calling getRecordingTasks on the adapter", async () => {
            expect(mockRecordingTaskModelAdapter.getRecordingTasks).not.toHaveBeenCalled();

            recordingTaskModel.getRecordingTasks().then((recordingTasks) => {
                expect(mockRecordingTaskModelAdapter.getRecordingTasks).toHaveBeenCalled();
                expect(recordingTasks).toEqual(allRecordingTasks);
            });
        });
    });

    describe("getRecordingTask", () => {
        it("Should return the value from calling getRecordingTask on the adapter", async () => {
            expect(mockRecordingTaskModelAdapter.getRecordingTask).not.toHaveBeenCalled();

            recordingTaskModel.getRecordingTask("fakeID").then((recordingTask) => {
                expect(mockRecordingTaskModelAdapter.getRecordingTask).toHaveBeenCalledWith("fakeID");
                expect(recordingTask).toEqual(task1);
            });
        });
    });

    describe("addRecordingTask", () => {
        it("Should return the value from calling addRecordingTask on the adapter", async () => {
            expect(mockRecordingTaskModelAdapter.addRecordingTask).not.toHaveBeenCalled();

            recordingTaskModel.addRecordingTask(task3).then((recordingTask) => {
                expect(mockRecordingTaskModelAdapter.addRecordingTask).toHaveBeenCalledWith(task3);
                expect(recordingTask).toEqual(task3);
            });
        });
    });

    describe("updateRecordingTask", () => {
        it("Should return the value from calling updateRecordingTask on the adapter", async () => {
            expect(mockRecordingTaskModelAdapter.updateRecordingTask).not.toHaveBeenCalled();

            recordingTaskModel.updateRecordingTask(task2).then((updateResult) => {
                expect(mockRecordingTaskModelAdapter.updateRecordingTask).toHaveBeenCalledWith(task2);
                expect(updateResult).toEqual(false);
            });
        });
    });

    describe("removeRecordingTask", () => {
        it("Should return the value from calling removeRecordingTask on the adapter", async () => {
            expect(mockRecordingTaskModelAdapter.removeRecordingTask).not.toHaveBeenCalled();

            recordingTaskModel.removeRecordingTask(task1).then((updateResult) => {
                expect(mockRecordingTaskModelAdapter.removeRecordingTask).toHaveBeenCalledWith(task1);
                expect(updateResult).toEqual(true);
            });
        });
    });

    function getMockRecordingTaskModelAdapter() {
        return jasmine.createSpyObj("adapter", {
            "getRecordingTasks": new Promise(resolve => resolve(allRecordingTasks)),
            "getRecordingTask": new Promise(resolve => resolve(task1)),
            "addRecordingTask": new Promise(resolve => resolve(task3)),
            "updateRecordingTask": new Promise(resolve => resolve(false)),
            "removeRecordingTask": new Promise(resolve => resolve(true))
        });
    }
});