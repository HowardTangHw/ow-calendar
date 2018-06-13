module.exports = {
  root: true,
  extends: ['plugin:vue-libs/recommended', 'plugin:vue/strongly-recommended'],
  rules: {
    semi: ['error', 'always'],
    'block-spacing': [2, 'always'],
    camelcase: [
      2,
      {
        properties: 'never',
      },
    ],
    'comma-dangle': [0, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': [2, 'last'],
    'func-call-spacing': [2, 'never'],
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'no-alert': 0,
    'no-console': [
      0,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-constant-condition': [
      2,
      {
        checkLoops: false,
      },
    ],
    'no-debugger': 2,
    'no-delete-var': 2,
    'no-eval': 2,
    'no-global-assign': 2,
    'no-redeclare': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'no-undef-init': 2,
    'no-unused-vars': [
      0,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'no-with': 2,
    quotes: [0, 'single'],
    'rest-spread-spacing': [2, 'never'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-infix-ops': 2,
    'space-before-function-paren': ['error', 'never'],
    'vue/require-v-for-key': 0,
    'vue/require-default-prop': 0,
    'vue/name-property-casing': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 5,
        multiline: {
          max: 5,
          allowFirstLine: false
        }
      }
    ]
  }
};