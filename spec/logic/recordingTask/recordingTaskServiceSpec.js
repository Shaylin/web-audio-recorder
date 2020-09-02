const RecordingTaskService = require("../../../src/logic/recordingTask/recordingTaskService");

describe("RecordingTaskService", () => {
	let recordingTaskService = null;
	let mockRecordingTaskModel = null;
	let mockAudioSourceModel = null;
	let mockRecordingMethod = null;
	let mockPollingMethod = null;

	let recordingPromise = null;
	let recordingPromiseResolve = null;

	const audioSource = {
		name: "Class95",
		url: "http://class95.sg"
	};

	const firstRecordingTask = {
		id: "1",
		audioSourceName: "Class95",
		hour: 10,
		minute: 30,
		duration: 5
	};

	const secondRecordingTask = {
		id: "2",
		audioSourceName: "Class95",
		hour: 20,
		minute: 0,
		duration: 120
	};

	const allRecordingTasks = [firstRecordingTask, secondRecordingTask];

	beforeEach(() => {
		recordingPromise = new Promise(resolve => {
			recordingPromiseResolve = resolve;
		});

		mockRecordingTaskModel = getMockRecordingTaskModel();
		mockAudioSourceModel = getMockAudioSourceModel();
		mockRecordingMethod = getMockRecordingMethod(recordingPromise);
		mockPollingMethod = getMockPollingMethod();

		recordingTaskService = new RecordingTaskService();

		recordingTaskService.init(mockRecordingTaskModel, mockAudioSourceModel, mockRecordingMethod, mockPollingMethod);
		recordingTaskService.activeRecordingTaskIds.add("1");
	});

	describe("Constructor and init", () => {
		it("Should construct", () => {
			expect(recordingTaskService).not.toBe(null);
		});

		it("Should register the recording task check callback to run every 10 seconds", () => {
			expect(mockPollingMethod).toHaveBeenCalledWith(jasmine.any(Function), 10000);
		});
	});

	describe("checkForTasksToExecute", () => {
		it("Should get all recording tasks from the recording task model", (done) => {
			expect(mockRecordingTaskModel.getRecordingTasks).not.toHaveBeenCalled();
			recordingTaskService.checkForTasksToExecute().then(() => {
				expect(mockRecordingTaskModel.getRecordingTasks).toHaveBeenCalled();
				done();
			});
		});

		describe("When a recording task is active", () => {
			describe("And the task schedule matches the current time", () => {
				it("Should not execute the recording task", (done) => {
					var mockedDate = new Date("December 17, 2020 10:30:00");
					jasmine.clock().mockDate(mockedDate);

					expect(mockRecordingMethod).not.toHaveBeenCalled();

					recordingTaskService.checkForTasksToExecute().then(() => {
						expect(mockRecordingMethod).not.toHaveBeenCalled();
						done();
					});
				});
			});

			describe("And the task schedule does not match the current time", () => {
				it("Should not execute the recording task", (done) => {
					var mockedDate = new Date("December 17, 2020 09:36:00");
					jasmine.clock().mockDate(mockedDate);

					expect(mockRecordingMethod).not.toHaveBeenCalled();

					recordingTaskService.checkForTasksToExecute().then(() => {
						expect(mockRecordingMethod).not.toHaveBeenCalled();
						done();
					});
				});
			});
		});

		describe("When a recording task is not active", () => {
			describe("And the task schedule matches the current time", () => {
				it("Should execute the recording task and perform the post recording actions", (done) => {
					var mockedDate = new Date("December 17, 2020 20:00:00");
					jasmine.clock().mockDate(mockedDate);

					expect(mockRecordingMethod).not.toHaveBeenCalled();

					recordingTaskService.checkForTasksToExecute().then(() => {
						expect(mockRecordingMethod).toHaveBeenCalledWith(secondRecordingTask, "http://class95.sg");
						
						done();
					});
				});

				it("Should mark the task as active while perform post recording task actions when done", async (done) => {
					var mockedDate = new Date("December 17, 2020 20:00:00");
					jasmine.clock().mockDate(mockedDate);

					expect(mockRecordingMethod).not.toHaveBeenCalled();

					await recordingTaskService.checkForTasksToExecute();

					expect(recordingTaskService.getActiveRecordingTaskIds()).toEqual(["1", "2"]);

					recordingPromise.then(() => {
						done();
					});

					recordingPromiseResolve("recordedClip.ogg");
				});
			});

			describe("And the task schedule does not match the current time", () => {
				it("Should not execute the recording task", (done) => {
					var mockedDate = new Date("December 17, 2020 18:00:00");
					jasmine.clock().mockDate(mockedDate);

					expect(mockRecordingMethod).not.toHaveBeenCalled();

					recordingTaskService.checkForTasksToExecute().then(() => {
						expect(mockRecordingMethod).not.toHaveBeenCalled();
						done();
					});
				});
			});
		});
	});

	describe("getActiveRecordingTaskIds", () => {
		describe("When there are no active tasks", () => {
			it("Should return an empty array", () => {
				recordingTaskService.activeRecordingTaskIds.delete("1");
				expect(recordingTaskService.getActiveRecordingTaskIds()).toEqual([]);
			});
		});

		describe("When there are active tasks", () => {
			it("Should return an array that contains the ids of all running tasks", () => {
				expect(recordingTaskService.getActiveRecordingTaskIds()).toEqual(["1"]);
			});
		});
	});

	function getMockRecordingTaskModel() {
		return jasmine.createSpyObj("recordingTaskModel", {
			"getRecordingTasks": new Promise(resolve => resolve(allRecordingTasks))
		});
	}

	function getMockAudioSourceModel() {
		return jasmine.createSpyObj("audioSource", {
			"getAudioSource": new Promise(resolve => resolve(audioSource))
		});
	}

	function getMockRecordingMethod(returnedPromise) {
		return jasmine.createSpy("recordingMethod").and.callFake(() => returnedPromise); 
	}

	function getMockPollingMethod() {
		return jasmine.createSpy("pollingMethod");
	}
});