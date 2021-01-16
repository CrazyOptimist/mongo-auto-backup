const AWS =             require('aws-sdk');
const fs =              require('fs');
const config =          require('../config');
const localBackupper =  require('./local');

const s3 = new AWS.S3({
  region:           config.aws.region,
  accessKeyId:      config.aws.accessKeyId,
  secretAccessKey:  config.aws.secretAccessKey
});

exports.performBackup = (config, newFileName) => {
  localBackupper.performBackup(config, newFileName);
  const localFilePath = `${config.app.localBackupDir}/${newFileName}.gz`;
  // upload will be asynchronous
  s3.upload({
    Bucket:         config.aws.s3BucketName,
    ACL:            'private',
    ContentType:    'application/gzip',
    Key:            `mongo_backups/${newFileName}.gz`,
    Body:           fs.createReadStream(localFilePath)
  }).promise()
    .then(result => {
      console.log(result);
      fs.unlinkSync(localFilePath);
    })
    .catch(error => console.log(error));
}

exports.removeOldBackups = config => {
  console.log('removing old backups from s3')
}
