const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '../logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '../logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, `../logs/${logFileName}.log`), logItem);

    } catch (error) {
        console.error(error);
    }
};

const logger = (req, res, next) => {
    const logFileName = 'Requests';
    const message = `${req.method}\t${req.url}\t${req.ip}\t${req.headers.origin}`;
    logEvents(message, logFileName);
    console.log(`${req.method} ${req.url}`);
    next();
};



module.exports = { logEvents, logger };
