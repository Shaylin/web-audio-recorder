const RadioStationModel = require("../../src/data/radioStation/radioStationModel");

describe("RadioStationModel", () => {
	let radioStationModel = null;
	let mockRadioStationModelAdapter = null;

	const class95 = {
		name: "Class95",
		url: "http://Class95.sg"
	};

	const money98 = {
		name: "Money98",
		url: "http://Money98.com"
	};

	const allRadioStations = [class95, money98];

	beforeEach(() => {
		mockRadioStationModelAdapter = getMockRadioStationModelAdapter();
		radioStationModel = new RadioStationModel(mockRadioStationModelAdapter);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(radioStationModel).not.toBe(null);
		});
	});

	describe("getRadioStations", () => {
		it("Should return the value from caling getRadioStations on the adapter", (done) => {
			expect(mockRadioStationModelAdapter.getRadioStations).not.toHaveBeenCalled();

			radioStationModel.getRadioStations().then((radioStations) => {
				expect(mockRadioStationModelAdapter.getRadioStations).toHaveBeenCalled();
				expect(radioStations).toEqual(allRadioStations);
				done();
			});
		});
	});

	describe("getRadioStation", ()=> {
		it("Should return the value from calling getRadioStation on the adapter", (done) => {
			expect(mockRadioStationModelAdapter.getRadioStation).not.toHaveBeenCalled();

			radioStationModel.getRadioStation("Class95").then((radioStation) => {
				expect(mockRadioStationModelAdapter.getRadioStation).toHaveBeenCalledWith("Class95");
				expect(radioStation).toEqual(class95);
				done();
			});
		});
	});

	function getMockRadioStationModelAdapter() {
		return jasmine.createSpyObj("adapter", {
			"getRadioStations": new Promise(resolve => resolve(allRadioStations)),
			"getRadioStation": new Promise(resolve => resolve(class95)),
			"addRadioStation": 2,
			"updateRadioStation": 3,
			"removeRadioStation": 3
		});
	}
});