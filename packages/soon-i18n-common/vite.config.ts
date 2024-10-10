import { defineConfig } from "vite";


import dts from "vite-plugin-dts";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            // rollupTypes: true,
        }),
    ],
    build: {
        // 打包输出的目录
        outDir: "lib",
        // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制
        cssTarget: "chrome61",
        lib: {
            // 组件库源码的入口文件
            entry: [resolve("src/index")],
            // 组件库名称
            name: "soon-i18n-common",
            // // 文件名称, 打包结果举例: my-packages.umd.cjs
            // fileName: "index",
        },

    }, define: { 'process.env.NODE_ENV': '"production"' }
});
