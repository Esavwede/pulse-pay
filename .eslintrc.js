module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // Path to your tsconfig.json
    ecmaVersion: 2020, // Modern ECMAScript features
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // You can override rules here
    // For example, if you find that Airbnb’s "no-console" is too strict:
    "no-console": "off",
    "prettier/prettier": "error",
  },
};
