module.exports = class MinioClipStorageModel {
    constructor(minioClient, bucketName) {
        this.minioClient = minioClient;
        this.bucketName = bucketName;
    }

    async getClips() {
        let clipObjects = [];
        let clipStream = this.minioClient.listObjects(this.bucketName);

        return new Promise(resolve => {
            clipStream.on("data", (clipObject) => {
                let clipToAdd = {};
                clipToAdd.name = clipObject.name;
                clipToAdd.fileSize = clipObject.size;
                clipToAdd.lastModified = clipObject.lastModified;

                clipObjects.push(clipToAdd);
            });

            clipStream.on("end", () => {
                resolve(clipObjects);
            });
        });
    }

    async getClipDownloadLink(name) {
        return this.minioClient.presignedGetObject(this.bucketName, name);
    }

    async uploadClip(name) {
        return this.minioClient.fPutObject(this.bucketName, name, `./${name}`);
    }

    async deleteClip(name) {
        return this.minioClient.removeObject(this.bucketName, name);
    }
};