import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import firebase from "firebase";

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

navigator.clipboard.writeText("ada");

messaging.usePublicVapidKey("BJpa5BUXJgyM_7c0YwagVRI1to8IH1xY3xcAPB-26LnnDTeG_B1VeF88wrzAJIZQarnZa3ek51FHC39HWqsiByU"); // 1. Generate a new key pair

messaging.getToken({ vapidKey: 'BJpa5BUXJgyM_7c0YwagVRI1to8IH1xY3xcAPB-26LnnDTeG_B1VeF88wrzAJIZQarnZa3ek51FHC39HWqsiByU' }).then((currentToken) => {
  if (currentToken) {
    alert(currentToken);
    navigator.clipboard.writeText(currentToken);
    console.log(currentToken)
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
  // messaging.getToken().then((token) => {
  //   console.log(token)
  // })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});
Vue.config.productionTip = false

// -----------------------------

const fs = require('fs') 
  
// Data which will write in a file. 
let data = "Learning how to write in a file."
  
// Write data in 'Output.txt' . 
fs.writeFile('Output.txt', data, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 

// ------------------------------------
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')


// ---------------------
// curl -X POST -H "Authorization: key=${AAAAH-anOf4:APA91bGM6hUZl2fSAJ6RcukOSB8pDOXNmk_9PW50DDj7RlnQpmIECjowgX_oKSo2aiEZNISYAfgp8UQm1avzDJnu3US6JoGk__aGltbOhZmNIjHwSK-QjVmc3t8RvrfYnylWytDHBn6O}" -H "Content-Type: application/json" -d '{
//   "to": "${eNHkNGOcZ4p62M1oWPZXBJ:APA91bFepZq6iHvAbftwtFUF1eo32jcKrwsizp_3B2zpyQphqRmK9rxK8FlRhnFw9xC5kgtsGgKPeJlYqfMCvCooCI28vVQSXPbbGCsXj78DXwqNsStRkN078yWFLo0S8aF9YrjJ_M4-
//   }",
//   "notification": {
//     "title": "FCM Message",
//     "body": "This is an FCM Message",
//   }
// }' https://fcm.googleapis.com/fcm/send

