const MinioClipStorageModel = require("./minioClipStorageModel");
const minio = require("minio");

module.exports = (objectStorageConfig) => {
	let minioClient = new minio.Client({
		endPoint: objectStorageConfig.endPoint,
		port: objectStorageConfig.port,
		useSSL: objectStorageConfig.useSSL,
		accessKey: objectStorageConfig.accessKey,
		secretKey: objectStorageConfig.secretKey
	});

	return new MinioClipStorageModel(minioClient, objectStorageConfig.bucketName);
};