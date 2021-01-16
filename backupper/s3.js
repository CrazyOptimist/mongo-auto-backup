const localBackupper = require("./local");

exports.performBackup = config => {
  console.log('doing backup to s3')
}

exports.removeOldBackups = config => {
  console.log('removing old backups from s3')
}
