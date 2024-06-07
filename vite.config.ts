import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: '../types/auto-import.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: '../types/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './', // for Electron resolve
  root: 'src',
  build: {
    outDir: '../electron/pages',
    rollupOptions: {
      input: {
        login: path.resolve(__dirname, 'src/login.html'),
        file: path.resolve(__dirname, 'src/file.html'),
        index: path.resolve(__dirname, 'src/index.html'),
        setting: path.resolve(__dirname, 'src/setting.html')
      }
    }
  }
})
