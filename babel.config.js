module.exports = {
    presets: ['next/babel'],
    plugins: ['reshadow/babel'],
    env: {
        test: {
            plugins: [['reshadow/babel', {files: /\.css$/}]],
        }
    }
};
