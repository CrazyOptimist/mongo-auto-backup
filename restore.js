const { execSync } =  require('child_process');
const parseArgs =     require('minimist');
const config =        require('./config');

/**
 * Restore mongodb using hand-picked backup file inside the '/local_backups' directory.
 * @param {string} fileName Required, name of the backup file inside the '/local_backups' directory, which will be restored.
 * @param {string} fromDB Optional, name of the original db
 * @param {string} toDB Optional, name of the target db
 */
const performRestore = (config, fileName, fromDB, toDB) => {
  let cmd = 
    'mongorestore' +
    ` --uri="${config.db.mongoUri}"` +
    ` --archive=${config.app.localBackupDir}/${fileName}` +
    ' --gzip' +
    ' --quiet';
  if (fromDB && toDB) {
    cmd += ` --nsFrom=${fromDB}.* --nsTo=${toDB}.*`;
  }
  execSync(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  });
}

/**
 * example command format
 * node restore --file=xxxxx.gz --fromDB=prod --toDB=dev
 */
const argv = parseArgs(process.argv.slice(2));

performRestore(config, argv.file, argv.fromDB, argv.toDB);
