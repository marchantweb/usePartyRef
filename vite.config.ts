import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'


export default defineConfig(({command, mode}) => {
    const isLibrary = mode === 'library'

    return {
        plugins: [
            vue(),
            isLibrary && dts({
                entryRoot: 'src',
                outDir: 'dist',
                tsconfigPath: resolve(__dirname, 'tsconfig.json'),
            }),
        ],
        root: isLibrary ? undefined : 'playground',
        build: isLibrary ? {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'usePartyRef',
                fileName: 'index',
                formats: ['es'],
            },
            rollupOptions: {
                external: ['vue'],
            },
        } : undefined,
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            },
        },
    }
})
