module.exports = {
    presets: [
        ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
        [
            "@babel/preset-env",
            {
                useBuiltIns: "usage",
                corejs: 3,
                targets: "cover 90% in LK"
            }
        ],
        '@babel/react',
        "@emotion/babel-preset-css-prop"
    ],
    plugins: [
        "react-hot-loader/babel",
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-numeric-separator',
        '@babel/plugin-proposal-optional-chaining'
    ],
}

