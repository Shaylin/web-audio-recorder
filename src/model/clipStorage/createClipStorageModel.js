const MinioClipStorageModel = require("./minioClipStorageModel");
const minio = require("minio");

module.exports = () => {
    let minioClient = new minio.Client({
        endPoint: process.env.OBJECT_STORAGE_ENDPOINT,
        port: process.env.OBJECT_STORAGE_PORT,
        useSSL: process.env.OBJECT_STORAGE_USE_SSL === "true",
        accessKey: process.env.OBJECT_STORAGE_ACCESS_KEY,
        secretKey: process.env.OBJECT_STORAGE_SECRET_KEY,
        region: "af-south-1" //TODO: Pull this out to a variable
    });

    return new MinioClipStorageModel(minioClient, process.env.OBJECT_STORAGE_BUCKET_NAME);
};