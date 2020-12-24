const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;

exports.performBackup = (config, newFileName) => {
  let cmd = 
    'mongodump' +
    ` --uri="${config.db.mongoUri}"` +
    ` --archive=${config.app.localBackupDir}/${newFileName}.gz` +
    ' --gzip' +
    ' --quiet';

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}

/**
 * This function will be used only when APP_STORAGE=local
 */
exports.removeOldBackups = config => {
  fs.readdirSync(config.app.localBackupDir)
    .forEach(fileName => {
      let oldTimestamp = parseInt(_.split(fileName, '-', 1)[0]);
      let newTimestamp = Date.now();
      let weeksDifference = Math.floor((newTimestamp - oldTimestamp)/1000/60/60/24/7);
      if (weeksDifference > config.app.retensionWeeks)
        fs.unlinkSync(`${config.app.localBackupDir}/${fileName}`);
    });
}

/**
 * This function will be used for APP_STORAGE types other than 'local'
 */
exports.removeAllBackups = config => {
  fs.readdirSync(config.app.localBackupDir)
    .forEach(fileName => {
      fs.unlinkSync(`${config.app.localBackupDir}/${fileName}`);
    });
}

/**
 * Restore mongodb using hand-picked backup file inside the '/backups' directory.
 * @param {string} fileName Name of the backup file inside the '/backups' directory, which will be restored.
 * @param {string} nsFrom Name of the original db
 * @param {string} nsTo Name of the target db
 */
exports.performRestore = (config, fileName, nsFrom, nsTo) => {

  let cmd = 
    'mongorestore' +
    ` --uri="${config.db.mongoUri}"` +
    ` --archive=${config.app.localBackupDir}/${fileName}` +
    ' --gzip' +
    ` --nsFrom ${nsFrom}.*` +
    ` --nsTo ${nsTo}.*` +
    ' --quiet';

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}
