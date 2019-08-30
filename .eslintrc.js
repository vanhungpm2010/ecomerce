const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'import/no-mutable-exports': 0,
    'no-underscore-dangle': 1,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'react/no-unused-state': 1,
    'import/no-extraneous-dependencies': 0,
    'react/prefer-stateless-function': 1,
    'lines-between-class-members': 1,
    'react/no-access-state-in-setstate': 1,
    'dot-notation': 1,
    'react/jsx-boolean-value': 0,
    'no-confusing-arrow': [2, { allowParens: true }],
    '@typescript-eslint/no-parameter-properties': 0,
    'no-nested-ternary': 1,
    eqeqeq: 1,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
