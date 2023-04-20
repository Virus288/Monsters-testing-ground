import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '../../assets/resource/fontello/css/fontello.css';
import * as errors from '../errors';
import App from './App';
import mainStore from './store';

const target = document.getElementById('root');
if (!target) throw new errors.NoRoot();

const root = ReactDOM.createRoot(target);

const Root: React.FC = () => {
  return (
    <Provider store={mainStore}>
      <App />
    </Provider>
  );
};

root.render(<Root />);

if (process.env.NODE_ENV !== 'production') {
  window.store = mainStore;
}
