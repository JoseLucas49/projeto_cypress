const { defineConfig } = require('cypress')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const fs = require('fs')
const path = require('path')

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      on('task', {
        deleteDownloads(folder) {
          const downloadsPath = path.join(__dirname, folder)
          if (fs.existsSync(downloadsPath)) {
            fs.rmSync(downloadsPath, { recursive: true, force: true })
          }
          fs.mkdirSync(downloadsPath, { recursive: true })
          return null
        },
        getDownloadedFiles(folder) {
          const downloadsPath = path.join(__dirname, folder)
          return fs.readdirSync(downloadsPath)
        },
      })

      return config
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://cabedelo.pb.gov.br/portal-da-transparencia',
    chromeWebSecurity: false,
    video: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    downloadsFolder: 'cypress/downloads',
  },
})