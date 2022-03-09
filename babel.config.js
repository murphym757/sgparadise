module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', "module:react-native-dotenv"],
    plugins: [
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
    ],
  }
}