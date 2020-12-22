require('dotenv').config()

const config = {
  db: {
    mongo_uri: process.env.MONGO_URI
  },
  app: {
    storage: process.env.APP_STORAGE || 'local',
    retension_weeks: process.env.RETENSION_WEEKS || 4,
    timezone: process.env.APP_TIMEZONE || "America/Chicago",
    cron_expression: process.env.CRON_EXPRESSION || "0 0 2 * *",
    local_backup_dir: `${__dirname}/backups`
  },
  aws: {
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3_bucket_name: process.env.S3_BUCKET_NAME
  }
};

module.exports = config;
