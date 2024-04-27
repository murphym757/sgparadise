module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            index: "./src/app/components/screens/index",
            auth: "./src/app/components/screens/authScreens",
            main: "./src/app/components/screens/mainScreens",
            user: "./src/app/components/screens/userScreens",
            server: "./src/server",
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}