import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import svgr from 'vite-plugin-svgr'
import hljs from 'highlight.js'
import path from 'path'
import md from 'vite-plugin-react-md'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
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
      ],
    }),
    svgr(),
    md({
      markdownIt: {
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="language-' +
                lang +
                '">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                '</pre>'
              )
              // return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
          }
          return '' // use external default escaping
        },
      },
    }),
  ],
})
