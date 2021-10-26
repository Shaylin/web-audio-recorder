const https = require("https");
const http = require("http");

class AudioSourceTester {
    constructor() {
    }

    async testAudioSource(audioSource) {
        let getMethod = this.determineGetMethod(audioSource);

        return new Promise((resolve) => {
            let request = getMethod(audioSource.url, (response) => {
                resolve(response.statusCode === 200 || response.statusCode === 302);
            });

            request.on("error", () => {
                resolve(false);
            });
        });
    }

    determineGetMethod(audioSource) {
        if (audioSource.url.includes("https")) {
            return https.get;
        }

        return http.get;
    }
}

module.exports = AudioSourceTester;