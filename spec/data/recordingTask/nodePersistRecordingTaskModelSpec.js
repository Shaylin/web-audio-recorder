const NodePersistRecordingTaskModel = require("../../../src/data/recordingTask/nodePersistRecordingTaskModel");

describe("NodePersistRecordingTaskModel", () => {
	let nodePersistRecordingTaskModel = null;
	let mockNodePersist = null;
	let mockUuidGenerator = null;

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

	const allRecordingTasks = [task1, task2];

	beforeEach(async () => {
		mockNodePersist = getMockNodePersist();
		mockUuidGenerator = getMockUuidGenerator();
		nodePersistRecordingTaskModel = new NodePersistRecordingTaskModel();
		await nodePersistRecordingTaskModel.init("fakeKey", mockNodePersist, mockUuidGenerator);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(nodePersistRecordingTaskModel).not.toBe(null);
		});
	});

	describe("getRecordingTasks", () => {
		it("Should return an array containing each of the model's recordingTasks", async () => {
			nodePersistRecordingTaskModel.getRecordingTasks().then((recordingTasks) => {
				expect(findRecordingTask(recordingTasks, "222")).toEqual(task1);
				expect(findRecordingTask(recordingTasks, "3")).toEqual(task2);
			});
		});
	});

	describe("getRecordingTask", () => {
		describe("When the model contains the recording task with the given id", () => {
			it("Should return the recording task with the specified id", async () => {
				nodePersistRecordingTaskModel.getRecordingTask("3").then((recordingTask) => {
					expect(recordingTask).toEqual(task2);
				});
			});
		});

		describe("When the model does not contain a recording task with the given id", () => {
			it("Should return null", async () => {
				nodePersistRecordingTaskModel.getRecordingTask("asdf").then((recordingTask) => {
					expect(recordingTask).toBe(null);
				});
			});
		});
	});

	describe("updateRecordingTask", () => {
		describe("When the model contains the recording task with the given id", () => {
			let updatedTask1 = {
				id: "222",
				audioSourceName: "Money98",
				hour: 19,
				minute: 20,
				duration: 5
			};

			it("Should update the fields on the recording task with the specified id", async () => {
				await nodePersistRecordingTaskModel.updateRecordingTask(updatedTask1);

				nodePersistRecordingTaskModel.getRecordingTask("222").then((recordingTask) => {
					expect(recordingTask).toEqual(updatedTask1);
				});
			});

			it("Should return true", async () => {
				nodePersistRecordingTaskModel.updateRecordingTask(updatedTask1).then((updateResult) => {
					expect(updateResult).toBe(true);
				});
			});

			it("Should update the recording tasks in local storage", async () => {
				nodePersistRecordingTaskModel.updateRecordingTask(updatedTask1).then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
				});
			});
		});

		describe("When the model does not contain a recording task with the given id", () => {
			let fakeTask = {
				id: "cba",
				audioSourceName: "fasd",
				hour: 19,
				minute: 20,
				duration: 5
			};

			it("Should not create a new recording task in the model", async () => {
				await nodePersistRecordingTaskModel.updateRecordingTask(fakeTask);

				nodePersistRecordingTaskModel.getRecordingTask("cba").then((recordingTask) => {
					expect(recordingTask).toBe(null);
				});
			});

			it("Should return false", async () => {
				nodePersistRecordingTaskModel.updateRecordingTask(fakeTask).then((updateResult) => {
					expect(updateResult).toBe(false);
				});
			});

			it("Should not update the recording tasks in local storage", async () => {
				nodePersistRecordingTaskModel.updateRecordingTask(fakeTask).then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
				});
			});
		});
	});

	describe("addRecordingTask", () => {
		let taskToAdd = {
			audioSourceName: "CNA938",
			hour: 19,
			minute: 22,
			duration: 334
		};

		let taskToAddWithGeneratedId = {
			id: "generatedId",
			audioSourceName: "CNA938",
			hour: 19,
			minute: 22,
			duration: 334
		};

		it("Should add the recording task to the model with a generated id", async () => {
			await nodePersistRecordingTaskModel.addRecordingTask(taskToAdd);

			nodePersistRecordingTaskModel.getRecordingTask("generatedId").then((recordingTask) => {
				expect(recordingTask).toEqual(taskToAddWithGeneratedId);
			});
		});

		it("Should return the recording task that was just added to the model", async () => {
			nodePersistRecordingTaskModel.addRecordingTask(taskToAdd).then((addResult) => {
				expect(addResult).toEqual(taskToAddWithGeneratedId);
			});
		});

		it("Should update audio sources in local storage", async () => {
			nodePersistRecordingTaskModel.addRecordingTask(taskToAdd).then((_) => {
				expect(mockNodePersist.updateItem).toHaveBeenCalled();
			});
		});
	});

	describe("removeRecordingTask", () => {
		describe("When the model contains the recording task with the given id", () => {
			it("Should remove the recording task with the specified id from the model", async () => {
				await nodePersistRecordingTaskModel.removeRecordingTask("222");

				nodePersistRecordingTaskModel.getRecordingTask("222").then((recordingTask) => {
					expect(recordingTask).toBe(null);
				});
			});

			it("Should return true", async () => {
				nodePersistRecordingTaskModel.removeRecordingTask("222").then((removeResult) => {
					expect(removeResult).toBe(true);
				});
			});

			it("Should update audio sources in local storage", async () => {
				nodePersistRecordingTaskModel.removeRecordingTask("222").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
				});
			});
		});

		describe("When the model does not contain a recording task with the given id", () => {
			it("Should return false", async () => {
				nodePersistRecordingTaskModel.removeRecordingTask("capoo").then((removeResult) => {
					expect(removeResult).toBe(false);
				});
			});

			it("Should not update audio sources in local storage", async () => {
				nodePersistRecordingTaskModel.removeRecordingTask("capoo").then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
				});
			});
		});
	});

	function getMockNodePersist() {
		return jasmine.createSpyObj("storage", {
			"get": new Promise(resolve => resolve(allRecordingTasks)),
			"updateItem": new Promise(resolve => resolve(task1))
		});
	}

	function getMockUuidGenerator() {
		return () => {
			return "generatedId";
		};
	}

	function findRecordingTask(array, id) {
		return array.find((element) => element.id == id);
	}
});