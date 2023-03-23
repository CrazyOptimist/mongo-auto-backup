const fs = require('fs');
const { execSync } = require('child_process');
const { getFileAgeInWeeks } = require('../utils');

exports.performBackup = (config, newFileName) => {
  const cmd =
    'mongodump' +
    ` --uri="${config.db.mongoUri}"` +
    ` --archive=${config.app.localBackupDir}/${newFileName}.gz` +
    ' --gzip' +
    ' --quiet';

  execSync(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
};

exports.removeOldBackups = (config) => {
  fs.readdirSync(config.app.localBackupDir).forEach((fileName) => {
    const fileAgeInWeeks = getFileAgeInWeeks(fileName);
    if (fileAgeInWeeks > config.app.retensionWeeks)
      fs.unlinkSync(`${config.app.localBackupDir}/${fileName}`);
  });
};
