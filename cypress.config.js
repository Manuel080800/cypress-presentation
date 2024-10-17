const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: 'shotsware',
    name: 'Shotsware Shotsware',
    password: '1234',
    url: 'http://localhost/admince/login',
    api: '',
    test: {
      username: 'cypress-dev-1',
      password: '123456',
      name: 'Cypress Automation'
    },
    validate: {
      dashboard: {
        url: 'admince/home/display',
        name: 'Dashboard'
      },
      journal: {
        url: 'admince/polizas/download',
        name: 'DESCARGAR POLIZAS'
      },
      user:{
        url: 'admince/usuario/display',
        name: 'PANEL DE USUARIOS',
        create: {
          url: 'admince/usuario/displayCreate',
          name: 'Registrar usuario'
        },
        update: {
          url: 'admince/usuario/displayUpdate',
          name: 'Registrar usuario'
        }
      }
    }
  },
  
  e2e: {
    setupNodeEvents(on, config) {
    }
  },

  pageLoadTimeout: 25000,
  requestTimeout: 25000,
  defaultCommandTimeout: 25000,
  responseTimeout: 25000,

  downloadsFolder: 'cypress/downloads',
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  screenshotOnRunFailure: true,
  videoCompression: 32,
  trashAssetsBeforeRuns: false,
  video: true,
});
