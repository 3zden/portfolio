module.exports = {
  // liquid-gl ships nullish coalescing, which webpack 4's parser can't read
  transpileDependencies: ['liquid-gl'],
  devServer: {
    port: 3000
  }
}
