import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000/',
    },
  },
  // the below would configures Vite to automatically import certain SASS files into every 
  // .scss file in your project, so you don't need to manually import them in each file


  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "./client/components/styles/_animations.scss";
  //         @import "./client/components/styles/_variables.scss";
  //         @import "./client/components/styles/_mixins.scss";
  //         @import "./client/components/styles/_helpers.scss";
  //       `
  //     }
  //   }
  // }
})