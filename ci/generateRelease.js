const childProcess = require("child_process");

function main() {
    let buildName = process.argv[0];
    console.log(`Generating release for ${buildName}`);

    let publishResponse = publishBuildToRegistry(buildName);
    console.log(`Publish build response ${publishResponse}`);
}

function publishBuildToRegistry(buildName) {
    let publishResponse = childProcess.execSync(`
        curl --header "JOB-TOKEN: ${process.env.CI_JOB_TOKEN}" --upload-file ./${buildName} \
            ${process.env.CI_API_V4_URL}/projects/${process.env.CI_PROJECT_ID}/packages/generic/${buildName}
    `);

    return publishResponse.toString();
}

main();