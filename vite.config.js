import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { viteMockServe } from 'vite-plugin-mock';

import { createStyleImportPlugin } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(commad => {
    return {
        plugins: [
            vue(),
            AutoImport({
                resolvers: [VantResolver()]
            }),
            Components({
                resolvers: [VantResolver()]
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: commad === 'serve'
            }),
            createStyleImportPlugin({
                libs: [
                    {
                        libraryName: 'vant',
                        esModule: true,
                        resolveStyle: name => {
                            if (
                                name == 'show-toast' ||
                                name == 'show-loading-toast'
                            ) {
                                return `../es/toast/style`;
                            } else if (
                                name == 'show-dialog' ||
                                name == 'show-confirm-dialog'
                            ) {
                                return `../es/dialog/style`;
                            } else {
                                return `../es/${name}/style`;
                            }
                        }
                    }
                ]
            })
        ],
        build: {
            rollupOptions: {
                output: {
                    dir: 'dist/',
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src/', import.meta.url))
            }
        }
    };
});
