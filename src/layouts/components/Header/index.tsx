// Header 顶部工具栏（可加导航菜单）
import React, { memo } from 'react';
import { Layout, Button, Space } from 'tdesign-react';
import { ViewListIcon } from 'tdesign-icons-react';

import HeaderIcon from './HeaderIcon';
import Search from './Search';
import { HeaderMenu } from '../Menu';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { selectGlobal, toggleMenu } from 'modules/global';

import Style from './index.module.less';

const { Header } = Layout;

export default memo((props: { showMenu?: boolean }) => {
  const globalState = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();

  // 不显示 header 工具栏
  if (!globalState.showHeader) {
    return null;
  }

  let HeaderLeft; // 左边内容
  if (props.showMenu) {
    HeaderLeft = (
      <div>
        <HeaderMenu />
      </div>
    );
  } else {
    HeaderLeft = (
      <Space align='center'>
        <Button
          shape='square'
          size='large'
          variant='text'
          onClick={() => dispatch(toggleMenu(null))}
          icon={<ViewListIcon />}
        />
        <Search />
      </Space>
    );
  }

  return (
    <Header className={Style.panel}>
      {HeaderLeft}
      <HeaderIcon />
    </Header>
  );
});
