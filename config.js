require('dotenv').config();

const config = {
  db: {
    mongoUri: process.env.MONGO_URI,
  },
  app: {
    storage: process.env.APP_STORAGE || 'local',
    retensionWeeks: process.env.RETENSION_WEEKS || 4,
    timezone: process.env.APP_TIMEZONE || 'America/Chicago',
    cronExpression: process.env.CRON_EXPRESSION || '0 0 2 * *',
    localBackupDir: `${__dirname}/local_backups`,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3BucketName: process.env.S3_BUCKET_NAME,
    s3FolderName: process.env.S3_FOLDER_NAME,
  },
};

module.exports = config;
