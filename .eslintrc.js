module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "plugins": ["node"],
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "rules": {
        "node/exports-style": ["error", "module.exports"],
        "no-console": "off",
        "no-unused-vars": "off",
        "eqeqeq": ["error", "always"],
        "no-return-assign": "error",
        "no-throw-literal": "error",
        "no-unused-expressions": "error",
        "no-warning-comments": [ "warn", {
            "terms": [ "TODO", "FIXME" ],
            "location": "anywhere"
        }],
        "wrap-iife": ["error", "inside", { "functionPrototypeMethods": true }],
        "strict": ["error", "global"],
        "semi": ["error", "always"],
        "no-extra-semi": "error",
        "no-var": "error",
        "prefer-const": "error"
    }
};