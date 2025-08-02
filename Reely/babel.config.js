module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': ['./app/assets'],
          '@components': ['./app/components'],
          '@ui': ['./app/components/ui'],
          '@config': ['./config'],
          '@navigation': ['./app/navigation'],
          '@screens': ['./app/screens'],
          '@utils': ['./app/utils'],
        },
      },
    ],
  ],
};