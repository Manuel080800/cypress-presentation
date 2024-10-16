const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: 'shotsware',
    password: '1234',
    url: 'http://sunplusxtra.org/admince/login',
    api: '',
    test: {
      username: 'cypress-development',
      password: '123456'
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
