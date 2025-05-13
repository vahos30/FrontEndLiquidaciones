import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    logLevel: "error",
    base: "",
    plugins: [
      react(),
      federation({
        name: "remoteLiquidationApp",
        filename: "assetsLiquidaciones/remoteEntry.js",
        exposes: {
          "./TabsManager": "./src/components/Tabs/TabsManager.tsx",
          "./DeliveryPointsManager": "./src/pages/points/DeliveryPointsManager.tsx"
        },
        remotes: {
          hcnHostApp: `${env.VITE_MICROFRONTEND_HCN}`,
        },
        shared: [
          "react",
          "react-dom",
          "react-router-dom",
          "@azure/msal-react",
          "bootstrap",
          "react-bootstrap",
          "axios",
          "@reduxjs/toolkit",
          "react-redux",
        ],
      }),
    ],
    build: {     
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      outDir: 'dist',
      assetsDir: '',       
      rollupOptions: {
        output: {
          assetFileNames: "assetsLiquidaciones/[name]-[hash][extname]",
          chunkFileNames: "assetsLiquidaciones/[name]-[hash].js",
          entryFileNames: "assetsLiquidaciones/[name]-[hash].js",
    },
  },
},
    server: {
      open: true,
      port: 5004,
      proxy: {
        "/api": {
          target: "https://apim-dev.hocol.com.co/External/", // URL de tu API
          changeOrigin: true, // Cambia el origen de la solicitud al del servidor objetivo
          secure: false, // Si el servidor tiene HTTPS con certificado autofirmado
          rewrite: (path) => path.replace(/^\/api/, ""), // Elimina el prefijo /api si es necesario
        },
        "/liquidation": {
          target: "https://localhost:7280/api/", // URL de tu API
          changeOrigin: true, // Cambia el origen de la solicitud al del servidor objetivo
          secure: false, // Si el servidor tiene HTTPS con certificado autofirmado
          rewrite: (path) => path.replace(/^\/liquidation/, ""), // Elimina el prefijo /api si es necesario
        },
      },
    },

    resolve: {
      alias: [
        { find: "@", replacement: path.resolve(__dirname, "./src") },
        {
          find: "@domain",
          replacement: path.resolve(__dirname, "./src/core/domain"),
        },
        {
          find: "@application",
          replacement: path.resolve(__dirname, "./src/core/application"),
        },
        {
          find: "@infrastructure",
          replacement: path.resolve(__dirname, "./src/core/infrastructure"),
        },
        {
          find: "@utils",
          replacement: path.resolve(__dirname, "./src/core/utils"),
        },
        {
          find: "@components",
          replacement: path.resolve(__dirname, "./src/core/components"),
        },
      ],
    },
  };
});
