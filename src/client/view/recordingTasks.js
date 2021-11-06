/* eslint-disable no-unused-vars */
function onAddNewRecordingTaskClicked() {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.add("is-active");
}

function onAudioSourceSelected(audioSource) {
    const audioSourceText = document.getElementById("audio-source-text");
    audioSourceText.style.backgroundColor = "transparent";

    audioSourceText.innerText = audioSource;
}

function onCreationConfirmed() {
    const creationModal = document.getElementById("creation-modal");
    const audioSourceText = document.getElementById("audio-source-text");
    const creationModalHours = document.getElementById("creation-modal-hours");
    const creationModalMinutes = document.getElementById("creation-modal-minutes");
    const creationModalDuration = document.getElementById("creation-modal-duration");

    if (validateHours(creationModalHours) && validateAudioSource(audioSourceText) && validateMinutes(creationModalMinutes) && validateDuration(creationModalDuration)) {
        let requestBody = JSON.stringify({
            audioSourceName: audioSourceText.innerText,
            hour: parseInt(creationModalHours.value),
            minute: parseInt(creationModalMinutes.value),
            duration: parseInt(creationModalDuration.value)
        });

        fetch("/api/recordingTasks", {method: "POST", body: requestBody, headers: {"Content-Type": "application/json"}})
            .then(response => response.json())
            .then(() => {
                creationModal.classList.remove("is-active");
                location.reload();
            });
    }
}

function validateAudioSource(textElement) {
    if (textElement.innerText.includes("Select Audio Source")) {
        textElement.style.backgroundColor = "lightsalmon";
        return false;
    }

    return true;
}

function closeCreationModal() {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.remove("is-active");
}

function onRecordingTaskDeleteClicked(taskId) {
    const deletionModal = document.getElementById("deletion-modal");
    const deletionModalName = document.getElementById("deletion-modal-name");

    fetch(`/api/recordingTasks/${taskId}`)
        .then(response => response.json())
        .then((recordingTask) => {
            deletionModalName.innerText = `${recordingTask.audioSourceName} ${recordingTask.hour}:${recordingTask.minute} - ${recordingTask.duration}m`;
            deletionModalName.value = taskId;
            deletionModal.classList.add("is-active");
        });
}

function onDeletionConfirmed() {
    const deletionModal = document.getElementById("deletion-modal");
    const deletionModalName = document.getElementById("deletion-modal-name").value;

    fetch(`/api/recordingTasks/${deletionModalName}`, {method: "DELETE"})
        .then(() => {
            deletionModal.classList.remove("is-active");
            location.reload();
        });
}

function closeDeletionModal() {
    const deletionModal = document.getElementById("deletion-modal");
    deletionModal.classList.remove("is-active");
}

function onRecordingTaskEditClicked(taskId) {
    const editModal = document.getElementById("edit-modal");
    editModal.classList.add("is-active");

    fetch(`/api/recordingTasks/${taskId}`)
        .then(response => response.json())
        .then((recordingTask) => {
            const audioSourceText = document.getElementById("edit-source-text");
            const editModalHours = document.getElementById("edit-modal-hours");
            const editModalMinutes = document.getElementById("edit-modal-minutes");
            const editModalDuration = document.getElementById("edit-modal-duration");
            editModal.value = taskId;

            audioSourceText.innerText = recordingTask.audioSourceName;
            editModalHours.value = recordingTask.hour;
            editModalMinutes.value = recordingTask.minute;
            editModalDuration.value = recordingTask.duration;

            editModal.classList.add("is-active");
        });
}

function onEditAudioSourceSelected(audioSource) {
    const audioSourceText = document.getElementById("edit-source-text");
    audioSourceText.style.backgroundColor = "transparent";

    audioSourceText.innerText = audioSource;
}

function closeEditModal() {
    const editModal = document.getElementById("edit-modal");
    editModal.classList.remove("is-active");
}

function onEditModalConfirmed() {
    const editModal = document.getElementById("edit-modal");
    const audioSourceText = document.getElementById("edit-source-text");
    const editModalHours = document.getElementById("edit-modal-hours");
    const editModalMinutes = document.getElementById("edit-modal-minutes");
    const editModalDuration = document.getElementById("edit-modal-duration");

    if (validateHours(editModalHours) && validateAudioSource(audioSourceText) && validateMinutes(editModalMinutes) && validateDuration(editModalDuration)) {
        const requestBody = JSON.stringify({
            id: editModal.value,
            audioSourceName: audioSourceText.innerText,
            hour: parseInt(editModalHours.value),
            minute: parseInt(editModalMinutes.value),
            duration: parseInt(editModalDuration.value)
        });

        fetch("/api/recordingTasks", {method: "PUT", body: requestBody, headers: {"Content-Type": "application/json"}})
            .then(response => response.json())
            .then(() => {
                editModal.classList.remove("is-active");
                location.reload();
            });
    }
}

function validateHours(hoursInput) {
    const hours = parseInt(hoursInput.value);

    if (hours >= 0 && hours < 24) {
        return true;
    }

    hoursInput.style.backgroundColor = "lightsalmon";
    hoursInput.oninput = () => {
        hoursInput.style.backgroundColor = "transparent";
    };

    return false;
}

function validateMinutes(inputElement) {
    const minutes = parseInt(inputElement.value);

    if (minutes >= 0 && minutes < 60) {
        return true;
    }

    inputElement.style.backgroundColor = "lightsalmon";
    inputElement.oninput = () => {
        inputElement.style.backgroundColor = "transparent";
    };

    return false;
}

function validateDuration(inputElement) {
    const duration = parseInt(inputElement.value);

    if (duration > 0) {
        return true;
    }

    inputElement.style.backgroundColor = "lightsalmon";
    inputElement.oninput = () => {
        inputElement.style.backgroundColor = "transparent";
    };

    return false;
}