module.exports = (app, audioSourceModel, audioSourceTester) => {
	/**
	* Retrieve all audio source objects currently stored by the app.
	* @returns {Array} A promise that resolves to an array of all audio source objects if successful.
	* Otherwise returns a 404 error.
	*/
	app.get("/api/audioSources", async (req, res) => {
		const audioSources = await audioSourceModel.getAudioSources();

		if (!audioSources) {
			res.status(404).send("The audio source list could not be retrieved");
			return;
		}

		res.send(audioSources);
	});

	/**
	* Retrieve a specific audio source with a given name that is stored in the app.
	* @returns {AudioSource} The audio source with the requested name if it exists.
	* Otherwise returns a 404 error.
	*/
	app.get("/api/audioSources/:name", async (req, res) => {
		const audioSource = await audioSourceModel.getAudioSource(req.params.name);

		if (!audioSource) {
			res.status(404).send(`The audio source named ${req.params.name} was not found`);
			return;
		}

		res.send(audioSource);
	});

	/**
	* Adds an audio source to be stored in the app.
	* @param {AudioSource} audioSource An audio source object as part of the body of the request.
	* @returns {AudioSource} The audio source object that was just added to the app.
	*/
	app.post("/api/audioSources", async (req, res) => {
		await audioSourceModel.addAudioSource(req.body.name, req.body.url);

		res.send({ name: req.body.name, url: req.body.url });
	});
	
	/**
	* Update an existing audio source stored in the app.
	* @param {AudioSource} audioSource An audio source object as part of the body of the request.
	* @returns {AudioSource} The audio source object that was just updated.
	*/
	app.put("/api/audioSources/:name", async (req, res) => {
		let updateResult = await audioSourceModel.updateAudioSource(req.body.name, req.body.url);

		if (!updateResult) {
			res.status(404).send(`The audio source named ${req.params.name} was not found`);
			return;
		}

		res.send({ name: req.body.name, url: req.body.url });
	});

	/**
	* Test the connnection to an existing audio source stored in the app.
	* @param {String} name The name of the audio source to test as part of the request endpoint.
	* @returns {Boolean} Whether or not the connection to the audio source was successful. 
	* If an audio source with the given name cannot be found in the app, a 404 error will be returned.
	*/
	app.get("/api/audioSources/:name/test", async (req, res) => {
		const audioSource = await audioSourceModel.getAudioSource(req.params.name);

		if (!audioSource) {
			res.status(404).send(`The audio source named ${req.params.name} was not found`);
			return;
		}

		let testResult = await audioSourceTester.test(audioSource);

		res.send(testResult);
	});
};