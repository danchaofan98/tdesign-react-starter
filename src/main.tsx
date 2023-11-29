// 入口文件
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 连接 store 和整个 react 应用
import { BrowserRouter } from 'react-router-dom'; // history 路由模式，把应用连接到路由

import store from 'modules/store'; // redux store
import App from 'layouts/index'; // layout 组件

import 'tdesign-react/es/style/index.css';

import './styles/index.less';

const env = import.meta.env.MODE || 'development';
const baseRouterName = env === 'site' ? '/starter/react/' : '';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('app')!;

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter basename={baseRouterName}>
        <App />
      </BrowserRouter>
    </Provider>,
  );
};

renderApp();
