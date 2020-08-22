module.exports = class RadioStationModel {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async getRadioStations() {
        return this.adapter.getRadioStations();
    }

    async getRadioStation(name) {
        return this.adapter.getRadioStation(name);
    }

    async addRadioStation(name, url) {
        return this.adapter.addRadioStation(name, url);
    }

    async updateRadioStation(name, url) {
        return this.adapter.updateRadioStation(name, url);
    }

    async removeRadioStation(name) {
        return this.adapter.removeRadioStation(name);
    }
}