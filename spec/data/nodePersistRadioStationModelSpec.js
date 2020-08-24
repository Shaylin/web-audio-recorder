const mockRequire = require("mock-require");

describe("NodePersistRadioStationModel", () => {
	let NodePersistRadioStationModel = require("../../src/data/radioStation/nodePersistRadioStationModel");
	let nodePersistRadioStationModel = null;

	const class95 = {
		name: "Class95",
		url: "http://Class95.sg"
	};

	const money98 = {
		name: "Money98",
		url: "http://Money98.com"
	};

	const fakeStorageKey = "fakeStorageKey";

	beforeEach(() => {
		mockRequire("node-persist", getMockNodePersist());
		NodePersistRadioStationModel = mockRequire.reRequire("../../src/data/radioStation/nodePersistRadioStationModel");
		nodePersistRadioStationModel = new NodePersistRadioStationModel();
	});

	xdescribe("Constructor", () => {
		it("Should construct", () => {
			expect(nodePersistRadioStationModel).not.toBe(null);
		});
	});

	describe("Get radio stations", () => {
		it("Should return an array containing each of the model's radio stations", async (done) => {
			await nodePersistRadioStationModel.init(fakeStorageKey);

			nodePersistRadioStationModel.getRadioStations().then((radioStations) => {
				expect(containsRadioStation(radioStations, class95)).toBe(true);
				expect(containsRadioStation(radioStations, money98)).toBe(true);
				done();
			});
		});
	});

	function containsRadioStation(array, radioStation) {
		return array.find((element) => element.name = radioStation.name && element.url == radioStation.url);
	}

	function getMockNodePersist() {
		return {
			get: async () => [class95]
		}
	}
});