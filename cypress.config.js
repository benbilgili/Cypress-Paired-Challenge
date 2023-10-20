const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register your custom task
      on('task', {
        unzipAndCountEntries: (filePath) => {
          // Define the same logic here if needed
          const AdmZip = require('adm-zip');
          const zip = new AdmZip(filePath);
          const zipEntries = zip.getEntries();
          return zipEntries.length;
        },
      });
    },
  },
});