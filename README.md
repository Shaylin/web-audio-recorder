# web-audio-recorder

An express based web app that allows for scheduled recording of audio sources. This app features a client interface to manage the recording schedulle. Recorded audio clips may optionally be stored in S3 object storage and accessed from the client interface.

## Use cases

The primary goal of this project was to develop a node webapp to be deployed to a server that would automatically record http radio streams for archival purposes. However, this app would also be useful for: 
* Recording scheduled web radio shows to listen to them later. 
* Having a reliable method to automatically record radio stations for brand management purposes, like ensuring advertisements ran during those shows.
* Scheduled recordings of a streaming home media server.

## Setup

### Software Dependencies 
* Node.js 14 LTS - While this project may work with earlier versions, the latest Node.js 14 LTS is what it's being developed with.

### Building
Builds are currently uploaded to the package registry as part of tag releases. These builds use webpack to bundle all dependencies and may be used for production use.

For building the project yourself, use the following steps:
* Clone the repository or download a zip of the repository and extract it
* Inside the web-audio-recorder folder, run `npm install`
* To build, run `npm run build`
* You should now have a build directory that contains the server javascript bundle, the client view files as well as a server configuration json file.
* To run the built app run `node server.js` inside the build folder.

### Configuration
For development, create a `.env` file with the following fields under the src directory. For production, this file must be present in the build directory.
```
PORT=9000
DELETE_CLIPS_AFTERWARDS=false

AUTH_ENABLED=true
AUTH_DOMAN=your.auth.domain
AUTH_CLIENT_ID=blabla
AUTH_CLIENT_SECRET=ssssh
SESSION_SECRET=generatedSessionSecret - node -e "console.log(crypto.randomBytes(32).toString('hex'))"
AUTH0_CALLBACK_URL=http://localhost:3000/callback

OBJECT_STORAGE_ENABLED=true
OBJECT_STORAGE_ENDPOINT=sg.somespaces.com
OBJECT_STORAGE_USE_SSL=true
OBJECT_STORAGE_ACCESS_KEY=yourStorageAccessKey
OBJECT_STORAGE_SECRET_KEY=yourSecret
OBJECT_STORAGE_BUCKET_NAME=yourBucketName
```

## TODO:
* Auth0 backed user authentication
* A simple client front end
* Configuration docs
