import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  typescript: true,
  rules: {
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'array-element-newline': [
      'error',
      'always',
    ],
    'object-curly-newline': [
      'error',
      {
        minProperties: 1,
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        minItems: 1,
      },
    ],
    'node/prefer-global/process': [
      'error',
      'always',
    ],
  },
})
