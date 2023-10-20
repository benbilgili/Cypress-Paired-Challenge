// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/plugins/index.js
const unzipper = require('unzipper');


Cypress.Commands.add('unzipFile', ({ zipData, extractionPath }) => {
    return new Promise((resolve, reject) => {
      const zipBlob = Cypress.Blob.binaryBufferToBlob(zipData, 'application/zip');
      const readable = new Cypress.Blob.Readable(zipBlob);
  
      const writable = new Cypress.Blob.WritableStream();
  
      writable.on('finish', () => {
        resolve();
      });
  
      writable.on('error', (error) => {
        reject(error);
      });
  
      readable.pipe(unzipper.Extract({ path: extractionPath })).pipe(writable);
    });
  });

module.exports = (on, config) => {
  on('task', {
    unzipFile({ zipFilePath, extractionPath }) {
      return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(zipFilePath);

        readStream
          .pipe(unzipper.Extract({ path: extractionPath }))
          .on('finish', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    },
  });
};

