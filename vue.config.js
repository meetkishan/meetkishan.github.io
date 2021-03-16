module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/vuejs-pwa-push/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    }
  }
}
