const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
    const logFileName = 'Errors';
    const message = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
    logEvents(message, logFileName);

    const status = res.statusCode || 500; // Default to 500 if status code is not available
    res.status(status).json({ message: err.message });
    console.log(`${err.name} ${err.message}`); // Log the error message to the console
};

module.exports = errorHandler;