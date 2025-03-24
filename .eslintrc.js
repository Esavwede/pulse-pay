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
    "no-console": "off",
    "prettier/prettier": "error",
    semi: ["error", "never"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      // Apply to all TypeScript files
      files: ["**/*.ts", "**/*.tsx"],
      // General rules for the project
      rules: {
        // Your existing rules
      },
    },
    {
      // Apply only to test files
      files: ["**/__tests__/**/*.ts", "**/*.test.ts", "**/*.spec.ts"],
      plugins: ["jest"], // Add Jest plugin
      extends: ["plugin:jest/recommended"], // Use recommended Jest rules
      env: {
        jest: true, // Enable Jest globals
      },
    },
  ],
}
