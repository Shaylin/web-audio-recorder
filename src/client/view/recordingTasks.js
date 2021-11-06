/* eslint-disable no-unused-vars */
function onAddNewRecordingTaskClicked() {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.add("is-active");
}

function onAudioSourceSelected(audioSource) {
    const audioSourceDropDown = document.getElementById("audio-source-dropdown");
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

    if (validateHours() && validateAudioSource() && validateMinutes() && validateDuration()) {
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

function validateAudioSource() {
    const audioSourceText = document.getElementById("audio-source-text");

    if (audioSourceText.innerText.includes("Select Audio Source")) {
        audioSourceText.style.backgroundColor = "lightsalmon";
        return false;
    }

    return true;
}

function validateHours() {
    const creationModalHours = document.getElementById("creation-modal-hours");

    const hours = parseInt(creationModalHours.value);

    if (hours > 0 && hours < 24) {
        return true;
    }

    creationModalHours.style.backgroundColor = "lightsalmon";
    creationModalHours.oninput = () => {
        creationModalHours.style.backgroundColor = "transparent";
    };

    return false;
}

function validateMinutes() {
    const creationModalMinutes = document.getElementById("creation-modal-minutes");

    const minutes = parseInt(creationModalMinutes.value);

    if (minutes > 0 && minutes < 60) {
        return true;
    }

    creationModalMinutes.style.backgroundColor = "lightsalmon";
    creationModalMinutes.oninput = () => {
        creationModalMinutes.style.backgroundColor = "transparent";
    };

    return false;
}

function validateDuration() {
    const creationModalDuration = document.getElementById("creation-modal-duration");

    const duration = parseInt(creationModalDuration.value);

    if (duration > 0) {
        return true;
    }

    creationModalDuration.style.backgroundColor = "lightsalmon";
    creationModalDuration.oninput = () => {
        creationModalDuration.style.backgroundColor = "transparent";
    };

    return false;
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