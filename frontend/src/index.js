import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//redux - react-redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

//Reducers

import rootReducer from './reducers';

//dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUsers } from './actions/users.actions';

//Création du store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//Dès le lancemenet de l'api, nous chargons tout les users
store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
