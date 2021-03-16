module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/vuejs-pwa-push/',
  pwa: {
    appleMobileWebAppCapable: 'yes',
    preferRelatedApplications: false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    }
  }
}
