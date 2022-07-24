/* eslint-env node */
module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    // extends: ["plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    // plugins: ["jest", "prettier"],
    rules: {
        // "prettier/prettier": "error",
        // 'linebreak-style': [
        //   'error',
        //   'unix'
        // ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
