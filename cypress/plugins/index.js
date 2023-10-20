const AdmZip = require('adm-zip');

module.exports = (on, config) => {
  on('task', {
    unzipFile({ zipFilePath, extractionPath }) {
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(extractionPath, true); // true to overwrite existing files
      return null;
    },
  });
};