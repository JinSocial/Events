import App from 'App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from 'store/UserStore';
import './index.css';

const store = new UserStore();

export const Context = createContext({
  store,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>
);
