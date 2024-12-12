/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

console.log("Test Log evaluation script and do nothing else");

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD1rIZyU8w9MCpojmSQcJ93uuXbv3cPDKc",
  authDomain: "localhost:3000",
  projectId: "mavoie-development",
  storageBucket: "mavoie-development.appspot.com",
  messagingSenderId: "533972991864",
  appId: "1:533972991864:web:55e09b2da52f79d778528d",
});

const messaging = firebase.messaging();

console.log("messaging instance is ", messaging);

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/assets/images/logo-mavoieV3-144x144.png",
  };
  console.log("self is", self);
  self.registration.showNotification(notificationTitle, notificationOptions);
});
