const createrecordingTaskRoutes = require("../../../src/api/recordingTask/createRecordingTaskRoutes");
const request = require("supertest");
const express = require("express");

describe("createRecordingTaskRoutesSpec", () => {
	let app = null;
	let mockRecordingTaskModel = null;
	let mockRecordingTaskService = null;

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

	beforeEach(() => {
		app = express();
		app.use(express.json());
		mockRecordingTaskModel = getMockRecordingTaskModel();
		mockRecordingTaskService = getMockRecordingTaskService();
	});

	describe("GET /api/recordingTasks", () => {
		describe("When there are no tasks stored in the model", () => {
			it("Should return an array of the recording task objects that are stored in the model", (done) => {
				createrecordingTaskRoutes(app, mockRecordingTaskModel, mockRecordingTaskService);
				expect(mockRecordingTaskModel.getRecordingTasks).not.toHaveBeenCalled();

				request(app)
					.get("/api/recordingTasks")
					.expect(200)
					.expect((response) => {
						expect(mockRecordingTaskModel.getRecordingTasks).toHaveBeenCalled();
						expect(response.body).toEqual(allRecordingTasks);
					})
					.then(done);
			});
		});

		describe("When there are recording tasks stored in the model", () => {
			it("Should return a 404 error to the client", (done) => {
				mockRecordingTaskModel = jasmine.createSpyObj("model", { "getRecordingTasks": new Promise(resolve => resolve(null)) });
				createrecordingTaskRoutes(app, mockRecordingTaskModel, mockRecordingTaskService);
				expect(mockRecordingTaskModel.getRecordingTasks).not.toHaveBeenCalled();

				request(app)
					.get("/api/recordingTasks")
					.expect(404)
					.expect((response) => {
						expect(mockRecordingTaskModel.getRecordingTasks).toHaveBeenCalled();
						expect(response.text).toEqual("The recording task list could not be retrieved");
					})
					.then(done);
			});
		});
	});

	describe("GET /api/recordingTasks/:id", () => {
		describe("When a recording task with the given id exists in the model", () => {
			it("Should return the recording task object with the given id", (done) => {
				createrecordingTaskRoutes(app, mockRecordingTaskModel, mockRecordingTaskService);
				expect(mockRecordingTaskModel.getRecordingTask).not.toHaveBeenCalled();

				request(app)
					.get("/api/recordingTasks/222")
					.expect(200)
					.expect((response) => {
						expect(mockRecordingTaskModel.getRecordingTask).toHaveBeenCalledWith("222");
						expect(response.body).toEqual(task1);
					})
					.then(done);
			});
		});

		describe("When a recording task with the given id does not exist in the model", () => {
			it("Should return a 404 error to the client", (done) => {
				mockRecordingTaskModel = jasmine.createSpyObj("model", { "getRecordingTask": new Promise(resolve => resolve(null)) });
				createrecordingTaskRoutes(app, mockRecordingTaskModel, mockRecordingTaskService);
				expect(mockRecordingTaskModel.getRecordingTask).not.toHaveBeenCalled();

				request(app)
					.get("/api/recordingTasks/223")
					.expect(404)
					.expect((response) => {
						expect(mockRecordingTaskModel.getRecordingTask).toHaveBeenCalledWith("223");
						expect(response.text).toEqual("The recording task with id 223 could not be retrieved");
					})
					.then(done);
			});
		});
	});

	describe("GET /api/runningRecordingTasks", () => {
		describe("When the recording task service returns an array of running task ids", () => {

		});

		describe("When the list of running recording tasks are null or empty", () => {

		});
	});

	describe("POST /api/recordingTasks/", () => {

	});

	describe("PUT /api/recordingTasks/", () => {

	});

	describe("DELETE /api/recordingTasks/:id", () => {

	});

	function getMockRecordingTaskModel() {
		return jasmine.createSpyObj("model", {
			"getRecordingTasks": new Promise(resolve => resolve(allRecordingTasks)),
			"getRecordingTask": new Promise(resolve => resolve(task1)),
			"addRecordingTask": new Promise(resolve => resolve(task2)),
			"updateRecordingTask": new Promise(resolve => resolve(false)),
			"removeRecordingTask": new Promise(resolve => resolve(true))
		});
	}

	function getMockRecordingTaskService() {
		return jasmine.createSpyObj("service", {
			"getActiveRecordingTaskIds": new Promise(resolve => resolve(["222"]))
		});
	}
});