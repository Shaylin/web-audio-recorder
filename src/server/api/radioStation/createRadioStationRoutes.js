module.exports = (app, radioStationModel) => {
	app.get("/api/radioStations", async (req, res) => {
		const radioStations = await radioStationModel.getRadioStations();

		if (!radioStations) {
			res.status(404).send("The radio station list could not be retrieved");
			return;
		}

		res.send(radioStations);
	});

	app.get("/api/radioStations/:name", async (req, res) => {
		const radioStation = await radioStationModel.getRadioStation(req.params.name);

		if (!radioStation) {
			res.status(404).send(`The radio station named ${req.params.name} was not found`);
			return;
		}

		res.send(radioStation);
	});

	//We need to add some validation stuff to the logic layer that validates the name and url -> Through the tester
	//If these tests fail, we return 400 Bad Request to the end user
	//We can also just use the node module called joi - and use that inside the logic layer
	app.post("/api/radioStations", async (req, res) => {
		await radioStationModel.addRadioStation(req.body.name, req.body.url);

		res.send({name: req.body.name, url: req.body.url});
	});

	app.put("/api/radioStations/:name", async (req, res) => {
		//Look up station - if it doesnt exist 404

		//If its a malformed update request return 400

		//If successful, return updated course
	});
};