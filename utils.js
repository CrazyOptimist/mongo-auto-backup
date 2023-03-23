const _ = require('lodash');

/**
 * Returns a new file name in the format of
 * timestamp-MM-DD-YY
 */
exports.getNewFileName = () => {
  const currentDate = new Date();
  const newFileName =
    currentDate.getTime() +
    '-' +
    (currentDate.getMonth() + 1) +
    '-' +
    currentDate.getDate() +
    '-' +
    currentDate.getFullYear();
  return newFileName;
};

/**
 * @param {string} fileName file name
 */
exports.getFileAgeInWeeks = (fileName) => {
  const oldTimestamp = parseInt(_.split(fileName, '-', 1)[0]);
  const newTimestamp = Date.now();
  const weeksDifference = Math.floor((newTimestamp - oldTimestamp) / 1000 / 60 / 60 / 24 / 7);
  return weeksDifference;
};
