const config = require('./config');
const uploader = require('./uploader')(config);
const utils = require('./utils');
const CronJob = require('cron').CronJob;

const job = new CronJob(
  config.app.cron_expression,
  () => {
    let fileName = utils.getNewFileName();
    uploader.perform_backup(config, fileName);
    uploader.remove_old_backups(config);
  },
  null,
  true,
  config.app.timezone
);

job.start();
