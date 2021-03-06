module.exports = 
{
    "env": {
        "es6": true,
        "node": true
    },
    "plugins": ["node"],
    "extends": ["eslint:recommended", "plugin:node/recommended"],
    "rules": {
        "eqeqeq": ["error", "always"],
        "no-console": "off",
        "no-extra-semi": "error",
        "no-return-assign": "error",
        "no-throw-literal": "error",
        "no-unused-expressions": "error",
        "no-unused-vars": ["error", { "args": "none" }],
        "no-var": "error",
        "no-warning-comments": [ "warn", {
            "terms": [ "TODO", "FIXME" ],
            "location": "anywhere"
        }],
        "prefer-const": "error",
        "semi": ["error", "always"],
        "strict": ["error", "global"],
        "wrap-iife": ["error", "inside", { "functionPrototypeMethods": true }],
        "node/exports-style": ["error", "module.exports"],
        "node/no-unsupported-features": "error"
    }
};