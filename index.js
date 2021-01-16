const config =        require('./config');
const {
  performBackup,
  removeOldBackups
} =                   require('./backupper')(config);
const utils =         require('./utils');
const CronJob =       require('cron').CronJob;

const job = new CronJob(
  config.app.cronExpression,
  () => {
    let fileName = utils.getNewFileName();
    try {
      performBackup(config, fileName);
      removeOldBackups(config);
    } catch (err) {
      console.log(err);
    }
  },
  null,
  true,
  config.app.timezone
);

job.start();
