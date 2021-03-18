// Implementing pusher beams ref: https://pusher.com/docs/beams/getting-started/web/sdk-integration
// importScripts("https://js.pusher.com/beams/service-worker.js");
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': '137013705214' // 4. Get Firebase Configuration
  });
  
  // Retrieve an instance of Firebase Messaging so that it can handle background messages.
  const messaging = firebase.messaging();
  