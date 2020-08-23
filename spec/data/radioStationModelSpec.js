const RadioStationModel = require("../../src/data/radioStation/radioStationModel");

describe("RadioStationModel", () => {
	let radioStationModel = null;
	let mockRadioStationModelAdapter = null;

	beforeEach(() => {
		mockRadioStationModelAdapter = getMockRadioStationModelAdapter();
		radioStationModel = new RadioStationModel(mockRadioStationModelAdapter);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(radioStationModel).not.toBe(null);
		});
	});

	it("Should be true", () => {
		let ting = true;
		expect(ting).toBe(true);
	});

	function getMockRadioStationModelAdapter() {
		return {
			getRadioStations: () => {
			},
			getRadioStation: (name) => {
			},
			addRadioStation: (name, url) => {
			},
			updateRadioStation: (name, url) => {
			},
			removeRadioStation: (name) => {
			}
		};
	}
});