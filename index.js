const config = require('./config');
const uploader = require('./uploader')(config);
const utils = require('./utils');
const CronJob = require('cron').CronJob;

const job = new CronJob(
  config.app.cronExpression,
  () => {
    let fileName = utils.getNewFileName();
    uploader.performBackup(config, fileName);
    uploader.removeOldBackups(config);
  },
  null,
  true,
  config.app.timezone
);

job.start();
