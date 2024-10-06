/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      server: {
        port: 8081,
      },
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
