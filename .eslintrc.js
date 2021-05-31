module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
        "import/prefer-default-export": "off",
        "no-use-before-define": "off",
        "no-tabs": ["error", { "allowIndentationTabs": true }],
        "react/require-default-props": "off",
        "react/prefer-stateless-function": "off",
        "camelcase": "off",
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off"
      },
      "settings": {
        "import/resolver": {
          "typescript": {}
        }
      }
    }