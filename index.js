const config = require('./config');
const { performBackup, removeOldBackups } = require('./backupper')(config);
const utils = require('./utils');
const CronJob = require('cron').CronJob;

function runBackup() {
  let fileName = utils.getNewFileName();
  try {
    performBackup(config, fileName);
    removeOldBackups(config);
  } catch (err) {
    console.log(err);
  }
}

if (config.app.runOnece) {
  console.log('Running in RUN_ONCE mode');
  runBackup();
  process.exit(0);
} else {
  console.log('Running in CRON mode');
  const job = new CronJob(config.app.cronExpression, runBackup, null, true, config.app.timezone);

  job.start();
}
