const createAudioSourceRoutes = require("../../../src/api/audioSource/createAudioSourceRoutes");
const request = require("supertest");
const express = require("express");

describe("createAudioSourceRoutes", () => {
	let app = null;
	let mockAudioSourceModel = null;
	let mockAudioSourceTester = null;

	const class95 = {
		name: "Class95",
		url: "http://Class95.sg"
	};

	const money98 = {
		name: "Money98",
		url: "http://Money98.com"
	};

	const allAudioSources = [class95, money98];

	beforeEach(() => {
		app = express();
		mockAudioSourceModel = getMockAudioSourceModel();
		mockAudioSourceTester = getMockAudioSourceTester();
	});

	describe("GET /api/audioSources", () => {
		describe("When the audio source model does not return any audio sources", () => {
			it("Should return a 404 error message to the client", (done) => {
				mockAudioSourceModel = jasmine.createSpyObj("model", { "getAudioSources": new Promise(resolve => resolve(null)) });
				createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
				expect(mockAudioSourceModel.getAudioSources).not.toHaveBeenCalled();

				request(app)
					.get("/api/audioSources")
					.expect(404)
					.expect((response) => {
						expect(mockAudioSourceModel.getAudioSources).toHaveBeenCalled();
						expect(response.text).toEqual("The audio source list could not be retrieved");
					})
					.then(done);
			});
		});

		describe("When the audio source model returns audio sources", () => {
			it("Should return the list of audio source objects obtained from the model", (done) => {
				createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
				expect(mockAudioSourceModel.getAudioSources).not.toHaveBeenCalled();

				request(app)
					.get("/api/audioSources")
					.expect(200)
					.expect((response) => {
						expect(mockAudioSourceModel.getAudioSources).toHaveBeenCalled();
						expect(response.body).toEqual(allAudioSources);
					})
					.then(done);
			});
		});
	});

	describe("GET /api/audioSources/:name", () => {

	});

	describe("POST  /api/audioSources", () => {

	});

	describe("PUT /api/audioSources/:name", () => {

	});

	describe("GET /api/audioSources/:name/test", () => {

	});

	describe("DELETE /api/audioSources/:name", () => {

	});

	function getMockAudioSourceModel() {
		return jasmine.createSpyObj("model", {
			"getAudioSources": new Promise(resolve => resolve(allAudioSources)),
			"getAudioSource": new Promise(resolve => resolve(class95)),
			"addAudioSource": new Promise(resolve => resolve(true)),
			"updateAudioSource": new Promise(resolve => resolve(false)),
			"removeAudioSource": new Promise(resolve => resolve(true))
		});
	}

	function getMockAudioSourceTester() {
		return jasmine.createSpyObj("tester", {
			"testAudioSource": new Promise(resolve => resolve(true))
		});
	}
});