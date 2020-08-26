module.exports = (app, audioSourceModel) => {
	app.get("/api/audioSources", async (req, res) => {
		const audioSources = await audioSourceModel.getAudioSources();

		if (!audioSources) {
			res.status(404).send("The audio source list could not be retrieved");
			return;
		}

		res.send(audioSources);
	});

	app.get("/api/audioSources/:name", async (req, res) => {
		const audioSource = await audioSourceModel.getAudioSource(req.params.name);

		if (!audioSource) {
			res.status(404).send(`The audio source named ${req.params.name} was not found`);
			return;
		}

		res.send(audioSource);
	});

	//We need to add some validation stuff to the logic layer that validates the name and url -> Through the tester
	//If these tests fail, we return 400 Bad Request to the end user
	//We can also just use the node module called joi - and use that inside the logic layer
	app.post("/api/audioSources", async (req, res) => {
		await audioSourceModel.addAudioSource(req.body.name, req.body.url);

		res.send({ name: req.body.name, url: req.body.url });
	});

	//app.put("/api/radioStations/:name", async (req, res) => {
	//Look up station - if it doesnt exist 404

	//If its a malformed update request return 400

	//If successful, return updated course
	//});
};