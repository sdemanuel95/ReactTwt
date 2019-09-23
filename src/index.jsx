import React  , {Component } from 'react';
//se usa el destructuring abajo así que no se importa toda la libreria
import ReactDOM from 'react-dom';

import App from './componentes/App';
import firebase from 'firebase';
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: 'AIzaSyAKR__FOrWxwAZrrwdE7Z0a6E7GcqH7tbk',
    authDomain: 'reacttwt.firebaseapp.com',
    databaseURL: 'https://reacttwt.firebaseio.com',
    projectId: 'reacttwt',
    storageBucket: '',
    messagingSenderId: '127447372938',
    appId: '1:127447372938:web:c2eff9129ece5f8a6d0973'
  });


 



ReactDOM.render(<App/>, document.getElementById('root'))
/*ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);*/