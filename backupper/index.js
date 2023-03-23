const localUploader = require('./local');
const s3Uploader = require('./s3');

module.exports = (config) => {
  switch (config.app.storage) {
    case 'local':
      return localUploader;
    case 'aws':
      return s3Uploader;
    default:
      return undefined;
  }
};
