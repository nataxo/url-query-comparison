module.exports = {
    presets: ['next/babel'],
    plugins: [
        'reshadow/babel',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    env: {
        test: {
            plugins: [['reshadow/babel', {files: /\.css$/}]],
        }
    }
};
