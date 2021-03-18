import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import firebase from "firebase";


Vue.config.productionTip = false

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

