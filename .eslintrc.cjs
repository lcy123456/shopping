// https://eslint.org/docs/user-guide/configuring
// require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: {
        browser: true,
        node: true
    },
    // required to lint *.vue files
    plugins: ['vue', 'prettier'],

    globals: {
        uni: 'writable',
        getApp: 'writable',
        plus: 'writable',
        require: 'writable',
        getCurrentPages: 'writable'
    },

    // add your custom rules here
    rules: {
        'prettier/prettier': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 10
            }
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-tabs': 'off',
        'prefer-promise-reject-errors': [0, { allowEmptyReject: false }],
        'comma-style': [2, 'last'],
        'no-mixed-spaces-and-tabs': [2, false],
        'no-var': 1,
        'no-irregular-whitespace': 2,
        'space-before-function-paren': 0,
        'generator-star-spacing': 2,
        'space-before-blocks': [2, 'always'],
        'keyword-spacing': 2,
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'semi-spacing': 2,
        semi: [2, 'always'],
        'object-curly-spacing': 0,
        'comma-spacing': 2,
        'key-spacing': [2, { beforeColon: false, afterColon: true }],
        'brace-style': [1, '1tbs'],
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-v-text-v-html-on-component': 0,
        'vue/no-v-html': 'off',
        'no-async-promise-executor': 0,
        'no-case-declarations': 0,
        'no-multi-spaces': 'off',
        'comma-dangle': ['error', 'never']
    },

    root: true,

    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
        'plugin:vue/essential',
        'plugin:prettier/recommended'
        // '@vue/typescript/recommended'
    ]
    // parserOptions: {
    //     parser: 'vue-eslint-parser',
    //     parserOptions: { parser: '@typescript-eslint/parser' }
    // }
};
