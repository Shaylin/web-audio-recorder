const NodePersistRadioStationModel = require("../../src/data/radioStation/nodePersistRadioStationModel");

describe("NodePersistRadioStationModel", () => {
	let nodePersistRadioStationModel = null;
	let mockNodePersist = null;

	const class95 = {
		name: "Class95",
		url: "http://Class95.sg"
	};

	const money98 = {
		name: "Money98",
		url: "http://Money98.com"
	};

	const allRadioStations = [class95, money98];

	const fakeStorageKey = "fakeStorageKey";

	beforeEach(async () => {
		mockNodePersist = getMockNodePersist();
		nodePersistRadioStationModel = new NodePersistRadioStationModel();
		await nodePersistRadioStationModel.init(fakeStorageKey, mockNodePersist);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(nodePersistRadioStationModel).not.toBe(null);
		});
	});

	describe("getRadioStation", () => {
		it("Should return an array containing each of the model's radio stations", async (done) => {
			nodePersistRadioStationModel.getRadioStations().then((radioStations) => {
				expect(findRadioStation(radioStations, class95)).toEqual(class95);
				expect(findRadioStation(radioStations, money98)).toEqual(money98);
				done();
			});
		});
	});

	describe("getRadioStation", () => {
		describe("When the model contains a radio station with the specified name", () => {
			it("Should return the radio station object with the specified name", async (done) => {
				nodePersistRadioStationModel.getRadioStation("Class95").then((radioStation) => {
					expect(radioStation).toEqual(class95);
					done();
				});
			});
		});

		describe("When the model does not contain a radio station with the specified name", () => {
			it("Should return null", async (done) => {
				nodePersistRadioStationModel.getRadioStation("Yes933").then((radioStation) => {
					expect(radioStation).toBe(null);
					done();
				});
			});
		});
	});

	describe("updateRadioStation", () => {
		describe("When the model contains a radio station with the specified name", () => {
			it("Should update the radio station object with the specified name", async (done) => {
				await nodePersistRadioStationModel.updateRadioStation("Class95", "http://newlink");

				nodePersistRadioStationModel.getRadioStation("Class95").then((radioStation) => {
					expect(radioStation.url).toEqual("http://newlink");
					done();
				});
			});

			it("Should return true", async (done) => {
				nodePersistRadioStationModel.updateRadioStation("Class95", "http://newlink").then((updateResult) => {
					expect(updateResult).toBe(true);
					done();
				});
			});

			it("Should update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.updateRadioStation("Class95", "http://newlink").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model does not contain a radio station with the specified name", () => {
			it("Should not create a new radio station object in the model", async (done) => {
				await nodePersistRadioStationModel.updateRadioStation("CNA958", "http://newlink");

				nodePersistRadioStationModel.getRadioStation("CNA958").then((radioStation) => {
					expect(radioStation).toBe(null);
					done();
				});
			});

			it("Should return false", async (done) => {
				nodePersistRadioStationModel.updateRadioStation("Class999", "http://newlink").then((updateResult) => {
					expect(updateResult).toBe(false);
					done();
				});
			});

			it("Should not update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.updateRadioStation("Class999", "http://newlink").then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe("addRadioStation", () => {
		describe("When the model does not contain a radio station with the specified name", () => {
			it("Should add the radio station object to the model", async (done) => {
				await nodePersistRadioStationModel.addRadioStation("Yes933", "http://Yes933.com");

				nodePersistRadioStationModel.getRadioStation("Yes933").then((radioStation) => {
					expect(radioStation.url).toEqual("http://Yes933.com");
					done();
				});
			});

			it("Should return true ", async (done) => {
				nodePersistRadioStationModel.addRadioStation("Yes933", "http://Yes933.com").then((addResult) => {
					expect(addResult).toBe(true);
					done();
				});
			});

			it("Should update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.addRadioStation("Yes933", "http://Yes933.com").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model already contains a radio station with the specified name", () => {
			it("Should update the radio station object in the model", async (done) => {
				await nodePersistRadioStationModel.addRadioStation("Class95", "http://Yes933.com");

				nodePersistRadioStationModel.getRadioStation("Class95").then((radioStation) => {
					expect(radioStation.url).toEqual("http://Yes933.com");
					done();
				});
			});

			it("Should return true ", async (done) => {
				nodePersistRadioStationModel.addRadioStation("Class95", "http://Yes933.com").then((addResult) => {
					expect(addResult).toBe(true);
					done();
				});
			});

			it("Should update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.addRadioStation("Class95", "http://Yes933.com").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe("removeRadioStation", () => {
		describe("When the mode does not contain a radio station with the given name", () => {
			it("Should return false", async (done) => {
				nodePersistRadioStationModel.removeRadioStation("Yes933").then((removeResult) => {
					expect(removeResult).toBe(false);
					done();
				});
			});

			it("Should not update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.removeRadioStation("Yes933").then(() => {
					expect(mockNodePersist.updateItem).not.toHaveBeenCalled();
					done();
				});
			});
		});

		describe("When the model contains a radio station with the given name", () => {
			it("Should remove the radio station from the model", async (done) => {
				await nodePersistRadioStationModel.removeRadioStation("Class95");

				nodePersistRadioStationModel.getRadioStation("Class95").then((radioStation) => {
					expect(radioStation).toBe(null);
					done();
				});
			});

			it("Should return true", async (done) => {
				nodePersistRadioStationModel.removeRadioStation("Class95").then((removeResult) => {
					expect(removeResult).toBe(true);
					done();
				});
			});

			it("Should update radio stations in local storage", async (done) => {
				nodePersistRadioStationModel.removeRadioStation("Class95").then(() => {
					expect(mockNodePersist.updateItem).toHaveBeenCalled();
					done();
				});
			});
		});
	});

	function findRadioStation(array, radioStation) {
		return array.find((element) => element.name == radioStation.name && element.url == radioStation.url);
	}

	function getMockNodePersist() {
		return jasmine.createSpyObj("storage", {
			"get": new Promise(resolve => resolve(allRadioStations)),
			"updateItem": new Promise(resolve => resolve(class95))
		});
	}
});