const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;

exports.perform_backup = (config, newFileName) => {
  let cmd = 
    'mongodump' +
    ` --uri="${config.db.mongo_uri}"` +
    ` --archive=${config.app.local_backup_dir}/${newFileName}.gz` +
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
exports.remove_old_backups = config => {
  fs.readdirSync(config.app.local_backup_dir)
    .forEach(fileName => {
      let oldTimestamp = parseInt(_.split(fileName, '-', 1)[0]);
      let newTimestamp = Date.now();
      let weeksDifference = Math.floor((newTimestamp - oldTimestamp)/1000/60/60/24/7);
      if (weeksDifference > config.app.retension_weeks)
        fs.unlinkSync(`${config.app.local_backup_dir}/${fileName}`);
    });
}

/**
 * This function will be used for APP_STORAGE types other than 'local'
 */
exports.remove_all_backups = config => {
  fs.readdirSync(config.app.local_backup_dir)
    .forEach(fileName => {
      fs.unlinkSync(`${config.app.local_backup_dir}/${fileName}`);
    });
}

/**
 * Restore mongodb using hand-picked backup file inside the '/backups' directory.
 * @param {string} fileName Name of the backup file inside the '/backups' directory, which will be restored.
 */
exports.perform_restore = (config, fileName) => {

  let cmd = 
    'mongorestore' +
    ` --uri="${config.db.mongo_uri}"` +
    ` --archive=${config.app.local_backup_dir}/${fileName}` +
    ' --gzip' +
    ' --quiet';

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}
