import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './lib/store/store';
import { App as AntdApp } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AntdApp>
      <App />
    </AntdApp>
  </Provider>
);
