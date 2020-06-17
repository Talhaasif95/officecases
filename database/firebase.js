import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCOjzlQhSzQkub3NvmRTpYiajxznI8cfqE',
  authDomain:
    '793372909447-fnnf5klva55igq87almjm4n4a03n0a9t.apps.googleusercontent.com',
  databaseURL: 'https://cases-8ffe8.firebaseio.com',
  projectId: 'cases-8ffe8',
  storageBucket: 'cases-8ffe8.appspot.com',
  messagingSenderId: '793372909447',
  appId: '1:000000000000000:web:000000000000000',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
