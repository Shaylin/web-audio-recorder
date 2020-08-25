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

	describe("Get radio stations", () => {
		it("Should return an array containing each of the model's radio stations", async (done) => {
			nodePersistRadioStationModel.getRadioStations().then((radioStations) => {
				expect(findRadioStation(radioStations, class95)).toEqual(class95);
				expect(findRadioStation(radioStations, money98)).toEqual(money98);
				done();
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