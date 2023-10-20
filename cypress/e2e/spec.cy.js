import commands from '../support/commands';

describe('template spec', () => {
  
  // it('logs into TDG and generates data using a custom template', () => {
  //   cy.visit('https://develop.d3nylssqqiptjw.amplifyapp.com/')
  //   cy.get('.nav-links-container a').eq(1).click()
  //   cy.get('select').select('Personal');
  //   cy.get('#submit-template').click();
  //   cy.get('#json-btn').click();
  //   cy.get('#generate-values').click();

  //   cy.contains('File is ready!');
  // })

  // it("Logs into TDG and generates data and saves to the history", () => {
  //   cy.visit('https://develop.d3nylssqqiptjw.amplifyapp.com/');
  //   cy.get('.nav-links-container a').eq(1).click();
  //   cy.get('select').select('Personal');
  //   cy.get('#submit-template').click();
  //   cy.get('#json-btn').click();
  //   cy.get('#generate-values').click();

  //   let fileName;

  //   cy.get('#file-name-input').invoke("val").then((value) => {
  //     fileName = value;
  //     console.log("Value.text: ", fileName);
  //     cy.get("#upload-button").click();
  //     cy.get("#modal-ok-button").click();
  //     cy.contains("HISTORY").click();
  //     // console.log("File name before check ", fileName);
  //     cy.wait(5000);
  //     cy.contains("DATA").click();
  //     cy.contains("HISTORY").click();
  //     cy.contains(`${fileName}.zip`);

  //     // the new file would only show if we waited a few secs, navigated away and back to history (anyone else have this issue?)
    // });


    describe('Unzipping a file in Cypress', () => {
      it('should unzip a file', () => {
        const zipFilePath = 'cypress/downloads/GENERIC-0ODrH1.zip';
        const extractionPath = 'cypress/unzipped';
    
        cy.task('unzipFile', { zipFilePath, extractionPath }).then(() => {
          // Perform Cypress tests or assertions on the extracted files
    
          // Example: Read the contents of a file from the extractionPath
          cy.readFile(extractionPath + '/JSON1.json').then((fileContent) => {
            // You can now assert or log the content as needed
            // For example, to log the content to the Cypress console:
            console.log('Contents of the unzipped file: ', fileContent);
          });
        });
      });
    });
    
    
    
    




    it.skip("Logs into TDG and generates 100 data examples for firstName, lastName, email, fullAddress", () => {


      const clickOptions = (identifier, indexList) => {
        cy.get(identifier).click()
        let count = 0; // negates the effect of the item being removed from the list (indexes all decreasing by 1)
        for (let item of indexList) {                           
          cy.get(`${identifier} .optionListContainer .optionContainer li`).eq(`${item - count}`).click();
          count++;
        }
        cy.contains('Number of entries').click(); // this is hacky. I don't like it
      }

      cy.visit('https://develop.d3nylssqqiptjw.amplifyapp.com/');
      cy.get('.nav-links-container a').eq(1).click();
      cy.get(".entries-input").type("00");
      clickOptions('#personal', [1, 3, 10])
      clickOptions('#residentialAddress', [0])
      cy.get('#submit-selected').click();
      cy.get('#json-btn').click();
      cy.get('#generate-values').click();
      cy.get('#download-button').click();




      cy.readFile('cypress/downloads/GENERIC-ETG23z.zip', 'binary', { timeout: 15000 }).should('exist').then((downloadedFile) => {
        console.log("downloaded file: ", downloadedFile)
        console.log('test')
      });

      
      
      // // download and check what's in the file
      });
    












    it.skip("Logs into TDG and generates data using the personal template, download it and upload the downloaded file for editing ", () => {
      cy.visit('https://develop.d3nylssqqiptjw.amplifyapp.com/');
      cy.get('.nav-links-container a').eq(1).click();
      cy.get('select').select('Personal');
      cy.get('#submit-template').click();
      cy.get('#json-btn').click();
      cy.get('#generate-values').click();

      let fileName;

      cy.get('#file-name-input').invoke("val").then((value) => {
        fileName = value;
        console.log("Name of file downloaded: ", fileName);

        cy.get('#download-button').click();
        cy.get('.nav-links-container a').eq(0).click();
        cy.get('.nav-links-container a').eq(1).click();
        cy.contains('Next').click();
        cy.get("input[type=file]").selectFile(`cypress/downloads/${fileName}.zip`, { force: true }) ; 
    });
    });



    });

