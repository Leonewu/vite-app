import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/css`
          },
        },
      ]
    }),
    svgr()
  ],
})
