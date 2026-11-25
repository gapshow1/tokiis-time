// Avisos de Tokiis Time (Firebase Cloud Messaging) con la app cerrada.
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: 'AIzaSyBWJKoNrqH12SS3k3wQv5LqqY1ACZnJ0is',
  authDomain: 'tokiis-time.firebaseapp.com',
  projectId: 'tokiis-time',
  storageBucket: 'tokiis-time.firebasestorage.app',
  messagingSenderId: '637590171365',
  appId: '1:637590171365:web:cba9af0199315d4cd6ee0c',
});
firebase.messaging();
