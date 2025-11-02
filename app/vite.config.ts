import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		nodePolyfills({
			include: ['buffer', 'process', 'util', 'stream', 'events'],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
		}),
		react(),
		viteTsconfigPaths({
			root: resolve(__dirname),
		}),
	],
	define: {
		'process.env': {},
	},
	resolve: {
		alias: {
			'rpc-websockets/dist/lib/client': 'rpc-websockets',
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		},
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		rollupOptions: {
			onwarn(warning, warn) {
				// Ignore the rpc-websockets resolution warning
				if (
					warning.code === 'UNRESOLVED_IMPORT' &&
					warning.message.includes('rpc-websockets')
				) {
					return
				}
				warn(warning)
			},
		},
	},
})
