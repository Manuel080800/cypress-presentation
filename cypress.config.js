const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: 'shotsware',
    name: 'Shotsware Shotsware',
    password: '1234',
    url: 'http://localhost/admince/login',
    api: '',
    test: {
      username: 'cypress-development',
      password: '123456'
    },
    validate: {
      dashboard: {
        url: 'admince/home/display',
        name: 'Dashboard'
      },
      journal: {
        url: 'admince/polizas/download',
        name: 'DESCARGAR POLIZAS'
      }
    }
  },
  
  e2e: {
    setupNodeEvents(on, config) {
    }
  },

  pageLoadTimeout: 5000,
  requestTimeout: 5000,
  defaultCommandTimeout: 5000,
  responseTimeout: 30000,

  downloadsFolder: 'cypress/downloads',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  screenshotOnRunFailure: true,
  videoCompression: 32,
  trashAssetsBeforeRuns: false,
  video: true,
});
