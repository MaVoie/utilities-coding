/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

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
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click Received.", event);
  event.notification.close();
  // Add custom click behavior here, e.g., opening a specific page
});

// Listen for version change messages
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VERSION_CHANGE") {
    const newVersion = event.data.version;
    console.log(`New app version available: ${newVersion}`);
    self.registration.showNotification("App Update Available", {
      body: `Version ${newVersion} is now available. Please refresh to update.`,
      icon: "/assets/images/logo-mavoieV3-144x144.png",
    });
  }
});
