// Implementing pusher beams ref: https://pusher.com/docs/beams/getting-started/web/sdk-integration
// importScripts("https://js.pusher.com/beams/service-worker.js");
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCZ96GQZonhNAxFYf6D1467O2lSgr7uess",
    authDomain: "trydemo-notification-2021.firebaseapp.com",
    projectId: "trydemo-notification-2021",
    storageBucket: "trydemo-notification-2021.appspot.com",
    messagingSenderId: "137013705214",
    appId: "1:137013705214:web:797bb6b61709cc95e328af"
  };
  const app = firebase.initializeApp(config);
  console.log(app)
  const messaging = firebase.messaging();
  
  messaging.usePublicVapidKey("BJpa5BUXJgyM_7c0YwagVRI1to8IH1xY3xcAPB-26LnnDTeG_B1VeF88wrzAJIZQarnZa3ek51FHC39HWqsiByU"); // 1. Generate a new key pair
  
  messaging.getToken({ vapidKey: 'BJpa5BUXJgyM_7c0YwagVRI1to8IH1xY3xcAPB-26LnnDTeG_B1VeF88wrzAJIZQarnZa3ek51FHC39HWqsiByU' }).then((currentToken) => {
    console.log(currentToken)
    if (currentToken) {
  
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
  
  // Request Permission of Notifications
  messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');
  
    // Get Token
    messaging.getToken().then((token) => {
      console.log(token)
    })
  }).catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });
  
  // Retrieve an instance of Firebase Messaging so that it can handle background messages.
  const messaging = firebase.messaging();
  

// For app update 
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})
