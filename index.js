const config = require('./config');
const uploader = require('./uploader')(config);
const fileNameUtil = require('./utils/file_name');

let fileName = fileNameUtil.getNewFileName();
uploader.perform_backup(config, fileName);
