/* eslint-disable no-unused-vars */
async function onAudioSourceEditClicked(audioSource) {
    const editModal = document.getElementById("edit-modal");
    const editModalHeader = document.getElementById("edit-modal-name");
    const editModalUrl = document.getElementById("edit-modal-url");

    fetch(`/api/audioSources/${audioSource}`)
        .then(response => response.json())
        .then(responseBody => {
            editModalHeader.innerText = audioSource;
            editModalUrl.value = responseBody.url;

            editModal.classList.add("is-active");
        });
}

function onAudioSourceEditSaved() {
    const editModal = document.getElementById("edit-modal");
    const audioSourceName = document.getElementById("edit-modal-name").innerText;
    const audioSourceUrl = document.getElementById("edit-modal-url").value;

    let requestBody = JSON.stringify({name: audioSourceName, url: audioSourceUrl});

    fetch("/api/audioSources", {method: "PUT", body: requestBody, headers: {"Content-Type": "application/json"}})
        .then(response => response.json())
        .then(() => {
            editModal.classList.remove("is-active");
        });
}

function closeEditModal() {
    const editModal = document.getElementById("edit-modal");
    editModal.classList.remove("is-active");
}

function onAddNewAudioSourceClicked(audioSourceData) {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.add("is-active");
}

function onCreationConfirmed() {
    const creationModal = document.getElementById("creation-modal");
    const audioSourceName = document.getElementById("creation-modal-name").value;
    const audioSourceUrl = document.getElementById("creation-modal-url").value;

    let requestBody = JSON.stringify({name: audioSourceName, url: audioSourceUrl});

    fetch("/api/audioSources", {method: "POST", body: requestBody, headers: {"Content-Type": "application/json"}})
        .then(response => response.json())
        .then(() => {
            creationModal.classList.remove("is-active");
            location.reload();
        });
}

function closeCreationModal() {
    const creationModal = document.getElementById("creation-modal");
    creationModal.classList.remove("is-active");
}

function onAudioSourceDeleteClicked(audioSource) {
    const deletionModal = document.getElementById("deletion-modal");
    const deletionModalName = document.getElementById("deletion-modal-name");
    deletionModalName.innerText = audioSource;

    deletionModal.classList.add("is-active");
}

function onDeletionConfirmed() {
    const deletionModal = document.getElementById("deletion-modal");
    const deletionModalName = document.getElementById("deletion-modal-name").innerText;

    fetch(`/api/audioSources/${deletionModalName}`, {method: "DELETE"})
        .then(() => {
            deletionModal.classList.remove("is-active");
            location.reload();
        });
}

function closeDeletionModal() {
    const deletionModal = document.getElementById("deletion-modal");
    deletionModal.classList.remove("is-active");
}