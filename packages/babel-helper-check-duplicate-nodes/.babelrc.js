const loose = true

module.exports = {
  presets: [
    ['@babel/env', {
      loose,
      modules: false,
      targets: {
      	node: 6
      },
    }],
  ],
  plugins: [
    '@babel/transform-modules-commonjs'
  ],
}
