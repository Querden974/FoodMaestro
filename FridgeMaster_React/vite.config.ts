import { defineConfig } from 'vite'
import {tanstackRouter} from "@tanstack/router-plugin/vite";
import path from 'path'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        verboseFileRoutes: false,
      }),
    react(),
    tailwindcss(),

  ],
    resolve:{
      alias:{
          "@": path.resolve(__dirname, './src'),
      }
    }
})