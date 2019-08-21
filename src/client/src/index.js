import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import mainReducer from './reducer';
import App from './App';
import DevTools from './components/DevTools';
import * as serviceWorker from './serviceWorker';

const isProduction = process.env.NODE_ENV === 'production';
const enhancer = compose(DevTools.instrument());

const store = createStore(mainReducer, enhancer);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <App />
        {!isProduction && <DevTools />}
      </>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();