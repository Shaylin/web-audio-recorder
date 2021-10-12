const ClipStorageModel = require("../../../src/data/clipStorage/clipStorageModel");

describe("ClipStorageModel", () => {
    let clipStorageModel = null;
    let mockClipStorageModelAdapter = null;

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
        mockClipStorageModelAdapter = getMockClipStorageAdapter();
        clipStorageModel = new ClipStorageModel(mockClipStorageModelAdapter);
    });

    describe("Constructor", () => {
        it("Should constructor", () => {
            expect(clipStorageModel).not.toBe(null);
        });
    });

    describe("getClips", () => {
        it("Should return the value from calling getClips on the adapter", async () => {
            expect(mockClipStorageModelAdapter.getClips).not.toHaveBeenCalled();
            clipStorageModel.getClips().then((clips) => {
                expect(mockClipStorageModelAdapter.getClips).toHaveBeenCalled();
                expect(clips).toEqual(allClips);
            });
        });
    });

    describe("getClipDownloadLink", () => {
        it("Should return the value from calling getClipDownloadLink on the adapter", async () => {
            expect(mockClipStorageModelAdapter.getClipDownloadLink).not.toHaveBeenCalled();
            clipStorageModel.getClipDownloadLink("Class95-2h04-8-12.ogg").then((downloadUrl) => {
                expect(mockClipStorageModelAdapter.getClipDownloadLink).toHaveBeenCalledWith("Class95-2h04-8-12.ogg");
                expect(downloadUrl).toEqual("http://somedownloadlink.com");
            });
        });
    });

    describe("uploadClip", () => {
        it("Should return the value from calling uploadClip on the adapter", async () => {
            expect(mockClipStorageModelAdapter.uploadClip).not.toHaveBeenCalled();
            clipStorageModel.uploadClip("Class95-2h04-8-12.ogg").then((uploadResult) => {
                expect(mockClipStorageModelAdapter.uploadClip).toHaveBeenCalledWith("Class95-2h04-8-12.ogg");
                expect(uploadResult).toEqual(true);
            });
        });
    });

    describe("deleteClip", () => {
        it("Should return the value from calling deleteClip on the adapter", async () => {
            expect(mockClipStorageModelAdapter.deleteClip).not.toHaveBeenCalled();
            clipStorageModel.deleteClip("Money98-8h30-2-12.ogg").then((deleteResult) => {
                expect(mockClipStorageModelAdapter.deleteClip).toHaveBeenCalledWith("Money98-8h30-2-12.ogg");
                expect(deleteResult).toEqual(false);
            });
        });
    });

    function getMockClipStorageAdapter() {
        return jasmine.createSpyObj("adapter", {
            "getClips": new Promise(resolve => resolve(allClips)),
            "getClipDownloadLink": new Promise(resolve => resolve("http://somedownloadlink.com")),
            "uploadClip": new Promise(resolve => resolve(true)),
            "deleteClip": new Promise(resolve => resolve(false))
        });
    }
});