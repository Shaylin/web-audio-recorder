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

    if (validateHours() || validateAudioSource()) {
        return;
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

function validateAudioSourceText() {
    const audioSourceText = document.getElementById("audio-source-text");

}

function closeCreationModal() {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.remove("is-active");
}