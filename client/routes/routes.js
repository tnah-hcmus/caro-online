import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { Provider } from 'react-redux';
import {store, persistor} from '../store/store';
import { PersistGate } from 'redux-persist/integration/react'
const Router = () => {
    return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <PrivateRoutes/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    );
}

export default Router