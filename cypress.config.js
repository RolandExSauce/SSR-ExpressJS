import { defineConfig  } from 'cypress'

// module.exports = defineConfig({
//   chromeWebSecurity: false,
//   e2e: {
//     supportFile: false,
//     baseUrl: 'http://localhost:3000', 
//     video: false,
//     setupNodeEvents(on, config) {},
//   },
// })



// import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:3000', 
    video: false,
    setupNodeEvents(on, config) {},
  },
});