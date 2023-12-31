module.exports = (app, recordingTaskModel, recordingTaskService) => {
    /**
	* Retrieve all recording tasks stored by the app.
	* @returns {Array} An array of all recording task objects if successful.
	* Otherwise returns a 404 error.
	*/
    app.get("/api/recordingTasks", async (req, res) => {
        const recordingTasks = await recordingTaskModel.getRecordingTasks();

        if (!recordingTasks) {
            res.status(404).send("The recording task list could not be retrieved");
            return;
        }

        res.send(recordingTasks);
    });

    /**
	* Retrieves a single recording task object matching the given id.
	* @returns {RecordingTask} The recording task object matching the given id.
	* Otherwise returns a 404 error.
	*/
    app.get("/api/recordingTasks/:id", async (req, res) => {
        const recordingTask = await recordingTaskModel.getRecordingTask(req.params.id);

        if (!recordingTask) {
            res.status(404).send(`The recording task with id ${req.params.id} could not be retrieved`);
            return;
        }

        res.send(recordingTask);
    });

    /**
	* Retrieve the ids of all currently running recording tasks.
	* @returns {Array} An array of all running recording task string ids if successful.
	* Otherwise returns a 404 error.
	*/
    app.get("/api/runningRecordingTasks", async (req, res) => {

        const runningRecordingTasks = await recordingTaskService.getActiveRecordingTaskIds();

        if (runningRecordingTasks) {
            res.send(runningRecordingTasks);
            return;
        }

        res.status(404).send("The running recording task list could not be retrieved");
    });

    /**
	* Add a recording task to the app.
	* @param {RecordingTask} recordingTask The recording task object to add provided as part of the request body.
	* @returns {RecordingTask} The recording task object that was just added with a newly generated id.
	*/
    app.post("/api/recordingTasks/", async (req, res) => {
        let updateResult = await recordingTaskModel.addRecordingTask(req.body);

        if (!updateResult) {
            res.status(404).send(`The recording task ${req.body} could not be added`);
            return;
        }

        res.send(updateResult);
    });

    /**
	* Update an existing recording task stored in the app.
	* @param {RecordingTask} recordingTask The recording task object to update provided as part of the request body.
	* @returns {RecordingTask} The recording task object that was just updated.
	*/
    app.put("/api/recordingTasks/", async (req, res) => {
        let updateResult = await recordingTaskModel.updateRecordingTask(req.body);

        if (!updateResult) {
            res.status(404).send(`The recording task with id ${req.body.id} could not be updated`);
            return;
        }

        res.send(updateResult);
    });

    /**
	* Delete a recording task stored in the app.
	* @param {String} id The id of the audio clip to delete.
	* @returns {Boolean} Whether or not the deletion was successful.
	* If an audio clip with the given name cannot be found in the app, a 404 error will be returned.
	*/
    app.delete("/api/recordingTasks/:id", async (req, res) => {
        const deletionResult = await recordingTaskModel.removeRecordingTask(req.params.id);

        if (!deletionResult) {
            res.status(404).send(`The recording task with id ${req.params.id} could not be deleted`);
            return;
        }

        res.send(deletionResult);
    });
};