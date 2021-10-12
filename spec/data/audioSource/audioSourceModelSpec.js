const AudioSourceModel = require("../../../src/data/audioSource/audioSourceModel");

describe("AudioSourceModel", () => {
    let audioSourceModel = null;
    let mockAudioSourceModelAdapter = null;

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
        mockAudioSourceModelAdapter = getMockAudioSourceModelAdapter();
        audioSourceModel = new AudioSourceModel(mockAudioSourceModelAdapter);
    });

    describe("Constructor", () => {
        it("Should construct", () => {
            expect(audioSourceModel).not.toBe(null);
        });
    });

    describe("getAudioSources", () => {
        it("Should return the value from caling getAudioSources on the adapter", (done) => {
            expect(mockAudioSourceModelAdapter.getAudioSources).not.toHaveBeenCalled();

            audioSourceModel.getAudioSources().then((audioSources) => {
                expect(mockAudioSourceModelAdapter.getAudioSources).toHaveBeenCalled();
                expect(audioSources).toEqual(allAudioSources);
                done();
            });
        });
    });

    describe("getAudioSource", ()=> {
        it("Should return the value from calling getAudioSource on the adapter", (done) => {
            expect(mockAudioSourceModelAdapter.getAudioSource).not.toHaveBeenCalled();

            audioSourceModel.getAudioSource("Class95").then((audioSource) => {
                expect(mockAudioSourceModelAdapter.getAudioSource).toHaveBeenCalledWith("Class95");
                expect(audioSource).toEqual(class95);
                done();
            });
        });
    });

    describe("addAudioSource", ()=> {
        it("Should return the value from calling addAudioSource on the adapter", (done) => {
            expect(mockAudioSourceModelAdapter.addAudioSource).not.toHaveBeenCalled();

            audioSourceModel.addAudioSource("Yes933", "http://yes.sg").then((addResult) => {
                expect(mockAudioSourceModelAdapter.addAudioSource).toHaveBeenCalledWith("Yes933", "http://yes.sg");
                expect(addResult).toEqual(true);
                done();
            });
        });
    });

    describe("updateAudioSource", ()=> {
        it("Should return the value from calling updateAudioSource on the adapter", (done) => {
            expect(mockAudioSourceModelAdapter.updateAudioSource).not.toHaveBeenCalled();

            audioSourceModel.updateAudioSource("Money98", "http://yez.sg").then((updateResult) => {
                expect(mockAudioSourceModelAdapter.updateAudioSource).toHaveBeenCalledWith("Money98", "http://yez.sg");
                expect(updateResult).toEqual(false);
                done();
            });
        });
    });

    describe("removeAudioSource", ()=> {
        it("Should return the value from calling removeAudioSource on the adapter", (done) => {
            expect(mockAudioSourceModelAdapter.removeAudioSource).not.toHaveBeenCalled();

            audioSourceModel.removeAudioSource("Class95").then((removeResult) => {
                expect(mockAudioSourceModelAdapter.removeAudioSource).toHaveBeenCalledWith("Class95");
                expect(removeResult).toEqual(true);
                done();
            });
        });
    });

    function getMockAudioSourceModelAdapter() {
        return jasmine.createSpyObj("adapter", {
            "getAudioSources": new Promise(resolve => resolve(allAudioSources)),
            "getAudioSource": new Promise(resolve => resolve(class95)),
            "addAudioSource": new Promise(resolve => resolve(true)),
            "updateAudioSource": new Promise(resolve => resolve(false)),
            "removeAudioSource": new Promise(resolve => resolve(true))
        });
    }
});