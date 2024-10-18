const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    name: 'Shotsware Shotsware',
    username: 'shotsware',
    password: '1234',
    url: 'http://localhost/admince/login',
    company: 'IAN Iglesia Adventista Nacional',
    test: {
      name: 'Cypress Automation',
      username: 'cypress-dev-5',
      password: '123456',
      data: {
        name: 'Cypress',
        lastName: 'Automation',
        state: 'Yucatán',
        city: {
          shortName: 'Mé',
          name: 'Mérida'
        },
        postalCode: '97000',
        phone: '6517988486',
        dataLocation: 'Sin proporcionar',
        email: 'automation@cypress.cy',
        rol: {
          shortName: 'admi',
          name: 'administrador'
        }
      },
      update: {
        lastName: 'Framework',
        dataLocation: 'Implementado en esta plataforma',
        email: 'framework@cypress.cy',
        rol: {
          shortName: 'cont',
          name: 'contador'
        }
      }
    },
    search: {
      monthly: '1',
      year: '2018'
    },
    assertions: {
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
