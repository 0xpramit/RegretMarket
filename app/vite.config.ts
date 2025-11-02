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
	resolve: {
		alias: {
			'rpc-websockets': 'rpc-websockets/dist/lib/client/websocket.browser.js'
		}
	},
	optimizeDeps: {
		include: ['rpc-websockets', '@solana/web3.js'],
		esbuildOptions: {
			target: 'esnext',
		}
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			external: [],
		}
	}
})
