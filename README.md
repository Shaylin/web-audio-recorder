# web-audio-recorder

An express based web app that allows for scheduled recording of audio sources. This app features a client interface to manage the recording schedulle. Recorded audio clips may optionally be stored in S3 object storage and accessed from the client interface.

## Use cases

The primary goal of this project was to develop a node webapp to be deployed to a server that would automatically record http radio streams for archival purposes. However, this app would also be useful for: 
* Recording scheduled web radio shows to listen to them later. 
* Having a reliable method to automatically record radio stations for brand management purposes, like ensuring advertisements ran during those shows.
* Scheduled recordings of a streaming home media server.

## Setup

### Software Dependencies 
* Node.js 12 LTS - While this project may work with earlier versions, the latest Node.js 12 LTS is what it's being developed with.
* FFmpeg - This project depends on having FFmpeg available on your PATH. If you're on a Debian based distro, installing FFmpeg should be as easy as running `sudo apt install ffmpeg`. Windows and MacOS binaries are available here: https://ffmpeg.zeranoe.com/builds/

### Building
Builds aren't currently included as part of releases, however artifacts should be available on the latest tag's CI pipeline. For building the project yourself, use the following steps:
* Clone the repository or download a zip of the repository and extract it
* Inside the web-audio-recorder folder, run `npm install`
* To build, run `npm run build`
* You should now have a build directory that contains the server javascript bundle, the client view files as well as a server configuration json file.
* To run the built app run `node server.js` inside the build folder.

### Configuration
