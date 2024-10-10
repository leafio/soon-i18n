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
            name: "soon-i18n-vue",
            // // 文件名称, 打包结果举例: my-packages.umd.cjs
            // fileName: "index",
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ["vue", "soon-i18n-common"],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'vue',
                    "soon-i18n-common": "soon-i18n-common",

                },
            },
        },
    }, define: { 'process.env.NODE_ENV': '"production"' }
});
