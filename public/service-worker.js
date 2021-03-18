// Implementing pusher beams ref: https://pusher.com/docs/beams/getting-started/web/sdk-integration
// importScripts("https://js.pusher.com/beams/service-worker.js");



// For app update 
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})
