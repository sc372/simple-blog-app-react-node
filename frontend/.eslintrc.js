module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': false,
    '@typescript-eslint/no-empty-interface': false,
    '@typescript-eslint/no-explicit-any': false,
    '@typescript-eslint/interface-name-prefix': ['always'],
    '@typescript-eslint/explicit-member-accessibility': false,
    "react/prop-types": false,
    "react/display-name": false
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
// {
//   "parser": "@typescript-eslint/parser",
//   "extends": [
//     "standard",
//     "plugin:react/recommended",
//     "prettier",
//     "prettier/react",
//     "prettier/standard"
//   ],
//   "plugins": [
//     "react",
//     "prettier",
//     "standard",
//     "@typescript-eslint/recommended",
//     "react/recommended",
//     "prettier/recommended"
//   ],
//   "globals": {
//     "localStorage": true
//   },
//   "parserOptions": {
//     "ecmaVersion": 2018,
//     "sourceType": "module",
//     "ecmaFeatures": {
//       "jsx": true
//     }
//   },
//   "env": {
//     "es6": true,
//     "node": true
//   },
//   "rules": {
//     "prettier/prettier": ["error", { "singleQuote": true, "semi": false }]
//   },
//   "settings": {
//     "react": {
//       "version": "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
//     }
//   }
// }
