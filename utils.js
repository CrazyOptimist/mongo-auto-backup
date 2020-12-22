exports.getNewFileName = () => {
  let timestamp = Date.now()
  let currentDate = new Date();
  let newFileName = 
    timestamp +
    '-' +
    currentDate.getFullYear() +
    '-' +
    (currentDate.getMonth() + 1) +
    '-' +
    currentDate.getDate();
  return newFileName;
}

