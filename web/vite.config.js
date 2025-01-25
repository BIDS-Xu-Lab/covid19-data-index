import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

export default ({ mode }) => {
  const base_path = process.env.VITE_BASE_PATH || './';

  return defineConfig({
    base: base_path,

    define: {
      // Expose the app-level env vars to the client.
      'import.meta.env': JSON.stringify(process.env),
    },

    plugins: [
      vue(),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      }),
    ],
  })
}
