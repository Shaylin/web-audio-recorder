const MinioClipStorageModel = require("../../../src/data/clipStorage/minioClipStorageModel");
const Stream = require("stream");

describe("MinioClipStorageModel", () => {
	let minioClipStorageModel = null;
	let mockMinioClient = null;
	let mockBucketName = "webStorageBucket";
	let mockObjectStream = Stream.Readable();

	const clip1 = {
		name: "Class95-2h04-8-12.ogg",
		size: 32000000,
		lastModified: "fakeModifiedDate",
		extraField: "someStuff"
	};

	const clip1WithoutExtras = {
		name: "Class95-2h04-8-12.ogg",
		fileSize: 32000000,
		lastModified: "fakeModifiedDate"
	};

	const clip2 = {
		name: "Money98-8h30-2-12.ogg",
		size: 18000,
		lastModified: "anotherFakeModifiedDate",
		extraField: "someMoreStuff"
	};

	const clip2WithoutExtras = {
		name: "Money98-8h30-2-12.ogg",
		fileSize: 18000,
		lastModified: "anotherFakeModifiedDate"
	};

	const allClipsWithoutExtras = [clip1WithoutExtras, clip2WithoutExtras];

	beforeEach(() => {
		mockObjectStream._read = () => {};
		mockMinioClient = getMockMinioClient(mockObjectStream);
		minioClipStorageModel = new MinioClipStorageModel(mockMinioClient, mockBucketName);
	});

	describe("Constructor", () => {
		it("Should construct", () => {
			expect(minioClipStorageModel).not.toBe(null);
		});
	});

	describe("getClips", () => {
		it("Should return a promise that resolves to an array of clip objects once the minio stream ends", async () => {
			expect(mockMinioClient.listObjects).not.toHaveBeenCalled();

			minioClipStorageModel.getClips().then((clipObjects) => {
				expect(mockMinioClient.listObjects).toHaveBeenCalledWith(mockBucketName);
				expect(clipObjects).toEqual(allClipsWithoutExtras);
			});

			mockObjectStream.emit("data", clip1);
			mockObjectStream.emit("data", clip2);
			mockObjectStream.emit("end");
		});
	});

	describe("getClipDownloadLink", () => {
		it("Should return a link for using the presignedGetObject method on the minio client", async () => {
			expect(mockMinioClient.presignedGetObject).not.toHaveBeenCalled();

			minioClipStorageModel.getClipDownloadLink("Class95-2h04-8-12.ogg").then((downloadLink) => {
				expect(mockMinioClient.presignedGetObject).toHaveBeenCalledWith(mockBucketName, "Class95-2h04-8-12.ogg");
				expect(downloadLink).toEqual("http://fakeurl.sg");
			});
		});
	});

	describe("uploadClip", () => {
		it("Should return the promise returned by the minio client by calling fPutObject", async () => {
			expect(mockMinioClient.fPutObject).not.toHaveBeenCalled();

			minioClipStorageModel.uploadClip("Class95-2h04-8-12.ogg").then((uploadResult) => {
				expect(mockMinioClient.fPutObject).toHaveBeenCalledWith(mockBucketName, "Class95-2h04-8-12.ogg", "./Class95-2h04-8-12.ogg");
				expect(uploadResult).toEqual(true);
			});
		});
	});

	describe("deleteClip", () => {
		it("Should return the promise returned by the minio client by calling removeObject", async () => {
			expect(mockMinioClient.removeObject).not.toHaveBeenCalled();

			minioClipStorageModel.deleteClip("Class95-2h04-8-12.ogg").then((deleteResult) => {
				expect(mockMinioClient.removeObject).toHaveBeenCalledWith(mockBucketName, "Class95-2h04-8-12.ogg");
				expect(deleteResult).toEqual(false);
			});
		});
	});

	function getMockMinioClient(objectStream) {
		return jasmine.createSpyObj("minioClient", {
			"listObjects": objectStream,
			"presignedGetObject": new Promise(resolve => resolve("http://fakeurl.sg")),
			"fPutObject": new Promise(resolve => resolve(true)),
			"removeObject": new Promise(resolve => resolve(false))
		});
	}
});