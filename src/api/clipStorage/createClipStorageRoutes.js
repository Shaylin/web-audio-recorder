module.exports = (app, clipStorageModel) => {
	/**
	* Retrieve all audio clips currently stored by the app.
	* @returns {Array} An array of all audio clip objects if successful.
	* Otherwise returns a 404 error.
	*/
	app.get("/api/audioClips", async (req, res) => {
		const clips = await clipStorageModel.getClips();

		if (!clips) {
			res.status(404).send("The clips list could not be retrieved");
			return;
		}

		res.send(clips);
	});

	/**
	* Download the audio clip with the given name. Redirects the GET request to the download link once it it done being created.
	* @param {String} name The name of the audio clip to download.
	* @returns {String} The download URL for the given audio clip. Expires in 7 days.
	*/
	app.get("/api/audioClips/:name/download", async (req, res) => {
		const clipDownloadLink = await clipStorageModel.getClipDownloadLink(req.params.name);

		if (!clipDownloadLink) {
			res.status(404).send(`A download link for the clip  ${req.params.name} could not be created`);
			return;
		}

		res.send(clipDownloadLink);
	});

	/**
	* Delete an audio clip stored in the app.
	* @param {String} name The name of the audio clip to delete.
	* @returns {Boolean} True - because the minio client does not return an error on a failed deletion.
	* If an audio clip with the given name cannot be found in the app, a 404 error will be returned.
	*/
	app.delete("/api/audioClips/:name", async (req, res) => {
		//TODO: Find a solution to minio client always returning true.
		await clipStorageModel.deleteClip(req.params.name);
		res.send(deletionResult);
	});
};