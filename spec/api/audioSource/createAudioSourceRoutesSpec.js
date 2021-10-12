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
        app.use(express.json());
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
        describe("When the requested audio source exists in the model", () => {
            it("Should return the audio source object matching that name", (done) => {
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.getAudioSource).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioSources/Class95")
                    .expect(200)
                    .expect((response) => {
                        expect(mockAudioSourceModel.getAudioSource).toHaveBeenCalledWith("Class95");
                        expect(response.body).toEqual(class95);
                    })
                    .then(done);
            });
        });

        describe("When the requested audio source does not exist in the model", () => {
            it("Should return a 404 error message to the client", (done) => {
                mockAudioSourceModel = jasmine.createSpyObj("model", { "getAudioSource": new Promise(resolve => resolve(null)) });
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.getAudioSource).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioSources/Closs99")
                    .expect(404)
                    .expect((response) => {
                        expect(mockAudioSourceModel.getAudioSource).toHaveBeenCalledWith("Closs99");
                        expect(response.text).toEqual("The audio source named Closs99 was not found");
                    })
                    .then(done);
            });
        });
    });

    describe("POST  /api/audioSources", () => {
        it("Should add the audio source object, provided in the request body, to the audio source model", (done) => {
            createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
            expect(mockAudioSourceModel.addAudioSource).not.toHaveBeenCalled();

            let audioSourceToPost = { name: "Yes933", url: "http://yes933.sg" };

            request(app)
                .post("/api/audioSources")
                .send(audioSourceToPost)
                .expect(200)
                .expect((response) => {
                    expect(mockAudioSourceModel.addAudioSource).toHaveBeenCalledWith("Yes933", "http://yes933.sg");
                    expect(response.body).toEqual(audioSourceToPost);
                })
                .then(done);
        });
    });

    describe("PUT /api/audioSources/:name", () => {
        describe("When the given audio source exists in the model", () => {
            it("Should tell the audio source model to update the audio source object provided in the body", (done) => {
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.updateAudioSource).not.toHaveBeenCalled();

                let audioSourceToUpdate = { name: "Class95", url: "http://yes933.sg" };

                request(app)
                    .put("/api/audioSources")
                    .send(audioSourceToUpdate)
                    .expect(200)
                    .expect((response) => {
                        expect(mockAudioSourceModel.updateAudioSource).toHaveBeenCalledWith("Class95", "http://yes933.sg");
                        expect(response.body).toEqual(audioSourceToUpdate);
                    })
                    .then(done);
            });
        });

        describe("When the given audio source does not exist in the model", () => {
            it("Should return a 404 error message to the client", (done) => {
                mockAudioSourceModel = jasmine.createSpyObj("model", { "updateAudioSource": new Promise(resolve => resolve(null)) });
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.updateAudioSource).not.toHaveBeenCalled();

                let audioSourceToUpdate = { name: "Closs99", url: "http://yes933.sg" };

                request(app)
                    .put("/api/audioSources")
                    .send(audioSourceToUpdate)
                    .expect(404)
                    .expect((response) => {
                        expect(mockAudioSourceModel.updateAudioSource).toHaveBeenCalledWith("Closs99", "http://yes933.sg");
                        expect(response.text).toEqual("The audio source named Closs99 was not found");
                    })
                    .then(done);
            });
        });
    });

    describe("GET /api/audioSources/:name/test", () => {
        describe("When the given audio source exists in the model", () => {
            it("Should return the test result returned by the audio source tester", (done) => {
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceTester.testAudioSource).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioSources/Class95/test")
                    .expect(200)
                    .expect((response) => {
                        expect(mockAudioSourceTester.testAudioSource).toHaveBeenCalledWith(class95);
                        expect(response.text).toEqual("true");
                    })
                    .then(done);
            });
        });

        describe("When the given audio source does not exist in the model", () => {
            it("Should return a 404 error message to the client", (done) => {
                mockAudioSourceModel = jasmine.createSpyObj("model", { "getAudioSource": new Promise(resolve => resolve(null)) });
                mockAudioSourceTester = jasmine.createSpyObj("tester", { "testAudioSource": new Promise(resolve => resolve(false)) });
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceTester.testAudioSource).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioSources/Closs95/test")
                    .expect(404)
                    .expect((response) => {
                        expect(mockAudioSourceModel.getAudioSource).toHaveBeenCalledWith("Closs95");
                        expect(mockAudioSourceTester.testAudioSource).not.toHaveBeenCalled();
                        expect(response.text).toEqual("The audio source named Closs95 was not found");
                    })
                    .then(done);
            });
        });
    });

    describe("DELETE /api/audioSources/:name", () => {
        describe("When the deletion of the audio source succeeds", () => {
            it("Should return the deletion result returned by the audio source model", (done) => {
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.removeAudioSource).not.toHaveBeenCalled();

                request(app)
                    .delete("/api/audioSources/Class95")
                    .expect(200)
                    .expect((response) => {
                        expect(mockAudioSourceModel.removeAudioSource).toHaveBeenCalledWith("Class95");
                        expect(response.text).toEqual("true");
                    })
                    .then(done);
            });
        });

        describe("When the deletion of the audio source fails", () => {
            it("Should return a 404 error message to the client", (done) => {
                mockAudioSourceModel = jasmine.createSpyObj("model", { "removeAudioSource": new Promise(resolve => resolve(false)) });
                createAudioSourceRoutes(app, mockAudioSourceModel, mockAudioSourceTester);
                expect(mockAudioSourceModel.removeAudioSource).not.toHaveBeenCalled();

                request(app)
                    .delete("/api/audioSources/Closs95")
                    .expect(404)
                    .expect((response) => {
                        expect(mockAudioSourceModel.removeAudioSource).toHaveBeenCalledWith("Closs95");
                        expect(response.text).toEqual("The audio source named Closs95 could not be deleted");
                    })
                    .then(done);
            });
        });
    });

    function getMockAudioSourceModel() {
        return jasmine.createSpyObj("model", {
            "getAudioSources": new Promise(resolve => resolve(allAudioSources)),
            "getAudioSource": new Promise(resolve => resolve(class95)),
            "addAudioSource": new Promise(resolve => resolve(true)),
            "updateAudioSource": new Promise(resolve => resolve(class95)),
            "removeAudioSource": new Promise(resolve => resolve(true))
        });
    }

    function getMockAudioSourceTester() {
        return jasmine.createSpyObj("tester", {
            "testAudioSource": new Promise(resolve => resolve(true))
        });
    }
});