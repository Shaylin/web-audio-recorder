/* eslint-disable no-unused-vars */
function onClipDownloadRequested(clipName) {
    fetch(`/api/audioClips/${clipName}/download`)
        .then(response => response.text())
        .then(responseText => {
            window.open(responseText, "_blank").focus();
        });
}