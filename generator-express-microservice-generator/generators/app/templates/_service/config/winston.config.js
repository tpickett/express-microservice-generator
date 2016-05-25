var winston = require('winston'),
    _ = require('lodash'),
    torchTransports = [],
    consoleTransportVars = {
        json: false,
        colorize: true
    },
    consoleTransport = new winston.transports.Console(consoleTransportVars);


/**
 * Logging instance for outside of Express
 * @return {Object} Winston Logger
 */
function winstonLogging() {

    torchTransports.push(consoleTransport);

    var logger = new(winston.Logger)({
        levels: {
            info: 0,
            success: 1,
            warning: 2,
            error: 3
        },
        colors: {
            info: 'blue',
            success: 'green',
            warning: 'yellow',
            error: 'red'
        },
        transports: torchTransports,
        exitOnError: false
    });
    _.merge(console, logger);
    return logger;
};

module.exports = exports = new winstonLogging;