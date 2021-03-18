// Implementing pusher beams ref: https://pusher.com/docs/beams/getting-started/web/sdk-integration
// importScripts("https://js.pusher.com/beams/service-worker.js");


// If you are using 'GenerateSW' (default) for your workboxPluginMode setting this file is auto generated for you.
// If you are using 'InjectManifest' then add this to your custom SW after your standard workbox config
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '137013705214' // 4. Get Firebase Configuration
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// For app update 
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})
