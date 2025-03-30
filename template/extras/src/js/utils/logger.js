const fs = require('fs');
const { promises: fsPromises } = require('fs');
const path = require('path');

const logEvents = async (message, LogFileName) => {
  const dateTime = new Date().toString();
  const logItem = `${dateTime}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', '..', 'logs', LogFileName),
      logItem,
    );
  } catch (err) {
    /* empty */
  }
};

module.exports = { logEvents };
