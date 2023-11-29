// App 的主要子组件，包含多种布局方式
import React from 'react';
import { Layout } from 'tdesign-react';
import classnames from 'classnames';

import { ELayout } from 'modules/global';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Content from './Content';

import Style from './AppLayout.module.less';

// 侧边栏导航布局
const SideLayout = React.memo(() => (
  <Layout className={classnames(Style.sidePanel, 'narrow-scrollbar')}>
    <Menu showLogo showOperation />
    <Layout className={Style.sideContainer}>
      <Header />
      <Content />
      <Footer />
    </Layout>
  </Layout>
));

// 顶部导航布局
const TopLayout = React.memo(() => (
  <Layout className={Style.topPanel}>
    <Header showMenu />
    <Content />
    <Footer />
  </Layout>
));

// 混合布局
const MixLayout = React.memo(() => (
  <Layout className={Style.mixPanel}>
    <Header />
    <Layout className={Style.mixMain}>
      <Menu />
      <Layout className={Style.mixContent}>
        <Content />
        <Footer />
      </Layout>
    </Layout>
  </Layout>
));

// 全屏布局（登录页）
const FullPageLayout = React.memo(() => <Content />);

export default {
  [ELayout.side]: SideLayout,
  [ELayout.top]: TopLayout,
  [ELayout.mix]: MixLayout,
  [ELayout.fullPage]: FullPageLayout,
};
