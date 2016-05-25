const os = require('os');

module.exports = {
    name: "<%= name %>",
    hostname: os.hostname(),
    home: os.homedir(),
    release: os.release(),
    platform: os.platform()
};