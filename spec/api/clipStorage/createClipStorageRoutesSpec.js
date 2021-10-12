const createClipStorageRoutes = require("../../../src/api/clipStorage/createClipStorageRoutes");
const request = require("supertest");
const express = require("express");

describe("createClipStorageRoutes", () => {
    let app = null;
    let mockClipStorageModel = null;

    const clip1 = {
        name: "Class95-2h04-8-12.ogg",
        fileSize: 32000000,
        lastModified: "fakeModifiedDate"
    };

    const clip2 = {
        name: "Money98-8h30-2-12.ogg",
        fileSize: 18000,
        lastModified: "anotherFakeModifiedDate"
    };

    const allClips = [clip1, clip2];

    beforeEach(() => {
        app = express();
        app.use(express.json());
        mockClipStorageModel = getMockClipStorageModel();
    });

    describe("GET /api/audioClips", () => {
        describe("When there are no audio clips stored in the model", () => {
            it("Should return a 404 error to the client", (done) => {
                createClipStorageRoutes(app, mockClipStorageModel);
                expect(mockClipStorageModel.getClips).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioClips")
                    .expect(200)
                    .expect((response) => {
                        expect(mockClipStorageModel.getClips).toHaveBeenCalled();
                        expect(response.body).toEqual(allClips);
                    })
                    .then(done);
            });
        });

        describe("When there are audio clips stored in the model", () => {
            it("Should return a 404 error to the client", (done) => {
                mockClipStorageModel = jasmine.createSpyObj("model", { "getClips": new Promise(resolve => resolve(null)) });
                createClipStorageRoutes(app, mockClipStorageModel);
                expect(mockClipStorageModel.getClips).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioClips")
                    .expect(404)
                    .expect((response) => {
                        expect(mockClipStorageModel.getClips).toHaveBeenCalled();
                        expect(response.text).toEqual("The clips list could not be retrieved");
                    })
                    .then(done);
            });
        });
    });

    describe("GET /api/audioClips/:name/download", () => {
        describe("When the given clip exists in the model", () => {
            it("Should return the download link returned for the given clip", (done) => {
                createClipStorageRoutes(app, mockClipStorageModel);
                expect(mockClipStorageModel.getClipDownloadLink).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioClips/Class95-2h04-8-12.ogg/download")
                    .expect(200)
                    .expect((response) => {
                        expect(mockClipStorageModel.getClipDownloadLink).toHaveBeenCalledWith("Class95-2h04-8-12.ogg");
                        expect(response.text).toEqual("http://somedownloadlink.com");
                    })
                    .then(done);
            });
        });

        describe("Then the given clip does not exist in the model", () => {
            it("Should return a 404 error to the client", (done) => {
                mockClipStorageModel = jasmine.createSpyObj("model", { "getClipDownloadLink": new Promise(resolve => resolve(null)) });
                createClipStorageRoutes(app, mockClipStorageModel);
                expect(mockClipStorageModel.getClipDownloadLink).not.toHaveBeenCalled();

                request(app)
                    .get("/api/audioClips/Clazz95.ogg/download")
                    .expect(404)
                    .expect((response) => {
                        expect(mockClipStorageModel.getClipDownloadLink).toHaveBeenCalledWith("Clazz95.ogg");
                        expect(response.text).toEqual("A download link for the clip  Clazz95.ogg could not be created");
                    })
                    .then(done);
            });
        });
    });

    describe("DELETE /api/audioClips/:name", () => {
        it("Should tell the clip storage model to delete the given clip", (done) => {
            createClipStorageRoutes(app, mockClipStorageModel);
            expect(mockClipStorageModel.deleteClip).not.toHaveBeenCalled();

            request(app)
                .delete("/api/audioClips/Class95-2h04-8-12.ogg")
                .expect(200)
                .expect((response) => {
                    expect(mockClipStorageModel.deleteClip).toHaveBeenCalledWith("Class95-2h04-8-12.ogg");
                    expect(response.text).toEqual("true");
                })
                .then(done);
        });
    });

    function getMockClipStorageModel() {
        return jasmine.createSpyObj("model", {
            "getClips": new Promise(resolve => resolve(allClips)),
            "getClipDownloadLink": new Promise(resolve => resolve("http://somedownloadlink.com")),
            "uploadClip": new Promise(resolve => resolve(true)),
            "deleteClip": new Promise(resolve => resolve(true))
        });
    }
});