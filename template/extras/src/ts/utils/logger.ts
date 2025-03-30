import fs, { promises as fsPromises } from 'fs';
import path from 'path';

const logEvents = async (message: string, LogFileName: string) => {
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

export { logEvents };
