import fs, { promises as fsPromises } from 'fs';
import path from 'path';

// The compiled JavaScript file will be executed from /dist/index.js
const logEvents = async (message: string, LogFileName: string) => {
  const dateTime = new Date().toISOString();
  const logItem = `${dateTime}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', LogFileName), logItem);
  } catch (err) {
    console.error('Failed to log event:', err);
  }
};

export { logEvents };
