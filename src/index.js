import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {firebaseContext} from './contexts/firebaseContext';
import firebase from './firebase/config';
import AuthProvider from './contexts/firebaseContext';
ReactDOM.render(
  <firebaseContext.Provider value={{firebase}}>
    <AuthProvider>

<App />
    </AuthProvider>
</firebaseContext.Provider>
, document.getElementById('root'));