module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:css-modules/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react'
  ],

  plugins: ['flowtype', 'css-modules', 'prettier'],

  globals: {
    __DEV__: true,
    ga: false
  },

  env: {
    browser: true
  },

  rules: {
    'no-plusplus': 'off',
    'no-debugger':0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': ['allow', { packageDir: '.' }],
    'import/named': 'allow',
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'jsx-a11y/label-has-for': [ 2, {
        "components": [ "Label" ],
        "required": {
            "some": [ "id" ]
        },
        "allowChildren": false
    }],
    "jsx-a11y/label-has-associated-control": 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename']
      }
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'no-param-reassign': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src']
      }
    }
  }
};
