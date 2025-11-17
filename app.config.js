// app.config.js
module.exports = ({ config }) => ({
  ...config,
  name: "KriscentApp",
  slug: "KriscentApp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.harendra.kriscentapp",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.harendra.kriscentapp",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [],
  extra: {
    supabaseUrl: "https://xrjffwuoveuzppbnwoir.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyamZmd3VvdmV1enBwYm53b2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDU1MjQsImV4cCI6MjA3ODE4MTUyNH0.Ijahjm815QUtMocSenGkBWLRc0z0K5rMFjGOyWSS_m8",
    eas: {
      projectId: "f7418151-09b8-48cb-8ab1-b8e106e3fdef",
    },
  },
});