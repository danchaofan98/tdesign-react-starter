// layout 组件，也就是 App 组件
import React, { memo, useEffect } from 'react';
import { Drawer, Layout } from 'tdesign-react';
import throttle from 'lodash/throttle'; // 节流

import { useAppSelector, useAppDispatch } from 'modules/store';
import { selectGlobal, toggleSetting, toggleMenu, ELayout, switchTheme } from 'modules/global';
import Setting from './components/Setting';
import AppLayout from './components/AppLayout';

import Style from './index.module.less';

export default memo(() => {
  // 获取全局状态
  const globalState = useAppSelector(selectGlobal);
  // 获取 dispatch 函数
  const dispatch = useAppDispatch();
  // 切换布局
  const AppContainer = AppLayout[globalState.isFullPage ? ELayout.fullPage : globalState.layout];

  // 切换主题；监听页面缩放，动态设置菜单展开或折叠
  useEffect(() => {
    dispatch(switchTheme(globalState.theme));

    const handleResize = throttle(() => {
      if (window.innerWidth < 900) {
        dispatch(toggleMenu(true));
      } else if (window.innerWidth > 1000) {
        dispatch(toggleMenu(false));
      }
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout className={Style.panel}>
      <AppContainer />
      <Drawer
        destroyOnClose
        visible={globalState.setting}
        size='458px'
        footer={false}
        header='页面配置'
        onClose={() => dispatch(toggleSetting())}
      >
        <Setting />
      </Drawer>
    </Layout>
  );
});
