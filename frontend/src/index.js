import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

//dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
//import { getUser } from './actions/user.actions';

//Création du store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//Dès le lancemenet de l'api, nous chargons tout les users
//store.dispatch(getUser());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
