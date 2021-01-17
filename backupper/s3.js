const AWS =             require('aws-sdk');
const fs =              require('fs');
const config =          require('../config');
const localBackupper =  require('./local');
const { getFileAgeInWeeks } = require('../utils');

const s3 = new AWS.S3({
  region:           config.aws.region,
  accessKeyId:      config.aws.accessKeyId,
  secretAccessKey:  config.aws.secretAccessKey
});

exports.performBackup = (config, newFileName) => {
  localBackupper.performBackup(config, newFileName);
  const localFilePath = `${config.app.localBackupDir}/${newFileName}.gz`;
  const params = {
    Bucket:         config.aws.s3BucketName,
    ACL:            'private',
    ContentType:    'application/gzip',
    Key:            `${config.aws.s3FolderName}/${newFileName}.gz`,
    Body:           fs.createReadStream(localFilePath)
  };
  // upload will be asynchronous
  s3.upload(params).promise()
    .then(result => {
      console.log(result);
      fs.unlinkSync(localFilePath);
    })
    .catch(error => console.log(error));
}

const deleteBackupByKey = key => {
  const deleteParams = {
    Bucket: config.aws.s3BucketName,
    Key: key
  };
  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {console.log(err, err.stack)}
    else {console.log(`Removed object(key=${key}) successfully.`)}
  });
}

exports.removeOldBackups = config => {
  const params = {
    Bucket: config.aws.s3BucketName,
    Prefix: config.aws.s3FolderName
  };
  s3.listObjectsV2(params).promise()
    .then(result => {
      for (const content of result.Contents) {
        const fileName = content.Key.slice(params.Prefix.length + 1);
        const fileAgeInWeeks = getFileAgeInWeeks(fileName);
        if (fileAgeInWeeks > config.app.retensionWeeks) {
          deleteBackupByKey(content.Key);
        }
      }
    })
    .catch(error => console.log(error));
}
