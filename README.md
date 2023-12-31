# web-audio-recorder

An express based web app that allows for scheduled recording of audio sources. This app features a client interface to manage the recording schedule. Recorded audio clips may optionally be stored in S3 object storage and accessed from the client interface.

## Use cases

The primary goal of this project was to develop a node webapp to be deployed to a server that would automatically record http radio streams for archival purposes. However, this app would also be useful for: 
* Recording scheduled web radio shows to listen to them later. 
* Having a reliable method to automatically record radio stations for brand management purposes, like ensuring advertisements ran during those shows.
* Scheduled recordings of a streaming home media server.

## Features

### Login Integration With Auth0

![Logging In](images/Login.gif)

### Manage Audio Sources

![Manage Audio Sources](images/ManageAudioSources.gif)

### Manage Recording Tasks

![Manage Recording Tasks](images/ManageRecordingTasks.gif)

### Download Recorded Clips From S3

![Download Recorded Clips](images/DownloadingClips.gif)

## Setup

### Software Dependencies 

* Node.js 16 LTS

### Building & Development

For building the project yourself, use the following steps:
* Clone the repository or download a zip of the repository and extract it
* Inside the web-audio-recorder folder, run `npm install`
* To build, run `npm run build`
* You should now have a build directory that contains the server javascript bundle, the client view files as well as a server configuration json file.
* To run the built app run `node server.js` inside the build folder.

Alternatively, you can both build and serve the app with:
* `npm run buildAndServe`

To serve the un-bundled and un-minified app during development, run:
* `npm run serve`

### Configuration

Create a `.env` file with the following fields under the `src` directory. This file is copied to the build directory for production builds.
```
PORT=9000
DELETE_CLIPS_AFTERWARDS=true

AUTH0_ENABLED=true
AUTH0_DOMAIN=your.auth.domain
AUTH0_CLIENT_ID=blabla
AUTH0_CLIENT_SECRET=ssssh
SESSION_SECRET=generatedSessionSecret - node -e "console.log(crypto.randomBytes(32).toString('hex'))"
AUTH0_CALLBACK_URL=http://localhost:9000/callback

OBJECT_STORAGE_ENABLED=true
OBJECT_STORAGE_ENDPOINT=s3.af-south-1.amazonaws.com
OBJECT_STORAGE_USE_SSL=true
OBJECT_STORAGE_ACCESS_KEY=yourStorageAccessKey
OBJECT_STORAGE_SECRET_KEY=yourSecret
OBJECT_STORAGE_BUCKET_NAME=yourBucketName
OBJECT_STORAGE_REGION=af-south-1
```