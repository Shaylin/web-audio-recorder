const NodePersistAudioSourceModel = require("../../../src/data/audioSource/nodePersistAudioSourceModel");

describe("NodePersistAudioSourceModel", () => {
	let nodePersistAudioSourceModel = null;
	let mockNodePersist = null;

	const class95 = {
		name: "Class95",
		url: "http://Class95.sg"
	};

	const money98 = {
		name: "Money98",
		url: "http://Money98.com"
	};

	const allAudioSources = [class95, money98];

	const fakeStorageKey = "fakeStorageKey";

	beforeEach(async () => {
		mockNodePersist = getMockNodePersist();
		nodePersistAudioSourceModel = new NodePersistAudioSourceModel();
		await nodePersistAudioSourceModel.init(fakeStorageKey, mockNodePersist);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(nodePersistAudioSourceModel).not.toBe(null);
		});
	});

	describe("getAudioSources", () => {
		it("Should return an array containing each of the model's audio sources", async (done) => {
			nodePersistAudioSourceModel.getAudioSources().then((audioSources) => {
				expect(findAudioSource(audioSources, class95)).toEqual(class95);
				expect(findAudioSource(audioSources, money98)).toEqual(money98);
				done();
			});
		});
	});

	describe("getAudioSources", () => {
		describe("When the model contains a audio source with the specified name", () => {
			it("Should return the audio source object with the specified name", async (done) => {
				nodePersistAudioSourceModel.getAudioSource("Class95").then((audioSource) => {
					expect(audioSource).toEqual(class95);
					done();
				});
			});
		});

		describe("When the model does not contain a audio source with the specified name", () => {
			it("Should return null", async (done) => {
				nodePersistAudioSourceModel.getAudioSource("Yes933").then((audioSource) => {
					expect(audioSource).toBe(null);
					done();
				});
			});
		});
	});

	describe("updateAudioSource", () => {
		describe("When the model contains a audio source with the specified name", () => {
			it("Should update the audio source object with the specified name", async (done) => {
				await nodePersistAudioSourceModel.updateAudioSource("Class95", "http://newlink");

				nodePersistAudioSourceModel.getAudioSource("Class95").then((audioSource) => {
					expect(audioSource.url).toEqual("http://newlink");
					done();
				});
			});

			it("Should return true", async (done) => {
				nodePersistAudioSourceModel.updateAudioSource("Class95", "http://newlink").then((updateResult) => {
					expect(updateResult).toBe(true);
					done();
				});
			});

			it("Should update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.updateAudioSource("Class95", "http://newlink").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model does not contain a audio source with the specified name", () => {
			it("Should not create a new audio source object in the model", async (done) => {
				await nodePersistAudioSourceModel.updateAudioSource("CNA958", "http://newlink");

				nodePersistAudioSourceModel.getAudioSource("CNA958").then((audioSource) => {
					expect(audioSource).toBe(null);
					done();
				});
			});

			it("Should return false", async (done) => {
				nodePersistAudioSourceModel.updateAudioSource("Class999", "http://newlink").then((updateResult) => {
					expect(updateResult).toBe(false);
					done();
				});
			});

			it("Should not update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.updateAudioSource("Class999", "http://newlink").then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe("addAudioSource", () => {
		describe("When the model does not contain a audio source with the specified name", () => {
			it("Should add the audio source object to the model", async (done) => {
				await nodePersistAudioSourceModel.addAudioSource("Yes933", "http://Yes933.com");

				nodePersistAudioSourceModel.getAudioSource("Yes933").then((audioSource) => {
					expect(audioSource.url).toEqual("http://Yes933.com");
					done();
				});
			});

			it("Should return the audio source that was added to the model ", async (done) => {
				nodePersistAudioSourceModel.addAudioSource("Yes933", "http://Yes933.com").then((addResult) => {
					expect(addResult).toEqual({name: "Yes933", url: "http://Yes933.com"});
					done();
				});
			});

			it("Should update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.addAudioSource("Yes933", "http://Yes933.com").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model already contains a audio source with the specified name", () => {
			it("Should update the audio source object in the model", async (done) => {
				await nodePersistAudioSourceModel.addAudioSource("Class95", "http://Yes933.com");

				nodePersistAudioSourceModel.getAudioSource("Class95").then((audioSource) => {
					expect(audioSource.url).toEqual("http://Yes933.com");
					done();
				});
			});

			it("Should return the audio source that was updated in the model ", async (done) => {
				nodePersistAudioSourceModel.addAudioSource("Class95", "http://Yes933.com").then((addResult) => {
					expect(addResult).toEqual({name: "Class95", url: "http://Yes933.com"});
					done();
				});
			});

			it("Should update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.addAudioSource("Class95", "http://Yes933.com").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe("removeAudioSource", () => {
		describe("When the mode does not contain a audio source with the given name", () => {
			it("Should return false", async (done) => {
				nodePersistAudioSourceModel.removeAudioSource("Yes933").then((removeResult) => {
					expect(removeResult).toBe(false);
					done();
				});
			});

			it("Should not update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.removeAudioSource("Yes933").then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model contains a audio source with the given name", () => {
			it("Should remove the audio source from the model", async (done) => {
				await nodePersistAudioSourceModel.removeAudioSource("Class95");

				nodePersistAudioSourceModel.getAudioSource("Class95").then((audioSource) => {
					expect(audioSource).toBe(null);
					done();
				});
			});

			it("Should return true", async (done) => {
				nodePersistAudioSourceModel.removeAudioSource("Class95").then((removeResult) => {
					expect(removeResult).toBe(true);
					done();
				});
			});

			it("Should update audio sources in local storage", async (done) => {
				nodePersistAudioSourceModel.removeAudioSource("Class95").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});
	});

	function findAudioSource(array, audioSource) {
		return array.find((element) => element.name == audioSource.name && element.url == audioSource.url);
	}

	function getMockNodePersist() {
		return jasmine.createSpyObj("storage", {
			"get": new Promise(resolve => resolve(allAudioSources)),
			"updateItem": new Promise(resolve => resolve(class95))
		});
	}
});