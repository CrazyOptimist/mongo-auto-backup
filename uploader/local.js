const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const exec = require('child_process').exec;

exports.perform_backup = (config, newFileName) => {
  let cmd = 
    'mongodump' +
    ` --uri="${config.db.mongo_uri}"` +
    ` --archive=${config.app.local_backup_dir}/${newFileName}.gz` +
    ' --gzip' +
    ' --quiet';

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

exports.remove_old_backups = config => {
  console.log('removing old backups')
}

exports.remove_all_backups = config => {
  console.log('removing all local backups')
}

exports.perform_restore = config => {
  console.log('restoring mongo backups')
}
