import { combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducer/authReducer';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';

const _createUUID = () => {
  let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
  v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return guid;
}

//map reducer -> store
const rootReducer = combineReducers({
  auth: authReducer,
});
const localDB = localForage.createInstance({
  name: "RVN-data"
});

const persistConfig = {
  key: 'root',
  whitelist: [],
  blacklist: ['auth'],
  storage: localDB,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


//Tạo store + gán listener cho mỗi lần thay đổi store -> ghi vào json
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

let persistor = persistStore(store);


export {store , persistor};
