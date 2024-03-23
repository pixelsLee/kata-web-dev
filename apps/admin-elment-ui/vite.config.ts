import { resolve } from 'path'
import { createRequire } from 'node:module'
import { defineConfig, loadEnv } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

const require = createRequire(import.meta.url)

export default defineConfig(({ command, mode }) => {
  const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd())

  return {
    base: VITE_BASE_URL,
    plugins: [
      vue2(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'IE 11'],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex'],
        resolvers: [ElementUiResolver()],
      }),
      Components({
        resolvers: [
          ElementUiResolver({
            importStyle: 'sass',
          }),
        ],
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
        vue: require.resolve('vue/dist/vue.esm.js'), // Vite+Vue2时，会强制重定向 vue 到 vue.esm.js，详见 https://github.com/vitejs/vite-plugin-vue2/issues/16#issuecomment-1171891909
      },
    },
    server: {
      // 端口号
      port: parseInt(VITE_PORT),
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {},
    },
    build: {
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  }
})