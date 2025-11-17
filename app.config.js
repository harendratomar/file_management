require('dotenv').config();

export default ({ config }) => ({
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
    backgroundColor: "#ffffff"
  },

  ios: {
    supportsTablet: true
  },

  android: {
    package: "com.harendra.kriscentapp",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true
  },

  web: {
    favicon: "./assets/favicon.png"
  },

  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: "f7418151-09b8-48cb-8ab1-b8e106e3fdef"
    }
  },

  updates: {
    url: "https://u.expo.dev/f7418151-09b8-48cb-8ab1-b8e106e3fdef"
  },

  plugins: []
});