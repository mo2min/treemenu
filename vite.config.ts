import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-dts";
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),dts()],
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'TreeMenu',
        formats: ['es', 'umd'],
        fileName: (format) => `tree-menu.${format}.js`,
    },
    rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    },
},
})
