module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis', 'plugin:react-hooks/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        'prettier/prettier': [
          'off',
          {
            semi: true,
            importOrderSeparation: false,
            importOrderSortSpecifiers: false,
            importOrderCaseInsensitive: false,
            endOfLine: 'auto',
            printWidth: 200
          }
        ],
        'sort-imports': 'off',
        'import/order': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to ESLint
    }
  },
  /* for lint-staged */
  globals: {
    __dirname: true
  }
}
