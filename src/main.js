import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCZ96GQZonhNAxFYf6D1467O2lSgr7uess",
  authDomain: "trydemo-notification-2021.firebaseapp.com",
  projectId: "trydemo-notification-2021",
  storageBucket: "trydemo-notification-2021.appspot.com",
  messagingSenderId: "137013705214",
  appId: "1:137013705214:web:797bb6b61709cc95e328af"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.usePublicVapidKey("BJpa5BUXJgyM_7c0YwagVRI1to8IH1xY3xcAPB-26LnnDTeG_B1VeF88wrzAJIZQarnZa3ek51FHC39HWqsiByU"); // 1. Generate a new key pair

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
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
