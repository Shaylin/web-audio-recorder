module.exports = class MinioClipStorageModel {
	constructor(minioClient, bucketName) {
		this.minioClient = minioClient;
		this.bucketName = bucketName;
	}

	async getClips() {
		return this.minioClient.listObjects(this.bucketName);
	}

	async getClipDownloadLink(name) {
		return this.minioClient.presignedUrl("GET", this.bucketName, name);
	}

	async uploadClip(name) {
		return this.minioClient.fPutObject(this.bucketName, name, `./${name}`);
	}

	async deleteClip(name) {
		return this.minioClient.removeObject(this.bucketName, name);
	}
};