// 顶部导航栏右侧内容，账户设置等
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popup, Badge, Dropdown, Space } from 'tdesign-react';
import {
  Icon,
  LogoGithubIcon,
  MailIcon,
  HelpCircleIcon,
  SettingIcon,
  PoweroffIcon,
  UserCircleIcon,
} from 'tdesign-icons-react';

import { useAppDispatch } from 'modules/store';
import { toggleSetting } from 'modules/global';
import { logout } from 'modules/user';

import Style from './HeaderIcon.module.less';

// const { DropdownMenu, DropdownItem } = Dropdown;

export default memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // GitHub 代码仓库
  const gotoGitHub = () => {
    window.open('https://github.com/Tencent/tdesign-react-starter');
  };

  // 官方文档
  const gotoWiki = () => {
    window.open('https://tdesign.tencent.com/react/overview');
  };

  // 退出登录
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login/index');
  };

  // 下拉菜单项
  const options = [
    {
      content: '个人中心',
      className: Style.dropItem,
      prefixIcon: <UserCircleIcon />,
      onClick: () => navigate('/user/index'),
    },
    {
      content: '退出登录',
      className: Style.dropItem,
      prefixIcon: <PoweroffIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Space align='center'>
      {/* 1.未读消息 */}
      <Badge className={Style.badge} count={6} dot={false} maxCount={99} shape='circle' showZero={false} size='medium'>
        <Button className={Style.menuIcon} shape='square' size='large' variant='text' icon={<MailIcon />} />
      </Badge>
      {/* 2.Github */}
      <Popup content='代码仓库' placement='bottom' showArrow destroyOnClose>
        <Button
          className={Style.menuIcon}
          shape='square'
          size='large'
          variant='text'
          onClick={gotoGitHub}
          icon={<LogoGithubIcon />}
        />
      </Popup>
      {/* 3.Help 文档 */}
      <Popup content='帮助文档' placement='bottom' showArrow destroyOnClose>
        <Button
          className={Style.menuIcon}
          shape='square'
          size='large'
          variant='text'
          onClick={gotoWiki}
          icon={<HelpCircleIcon />}
        />
      </Popup>
      {/* 4.账户设置 */}
      <Dropdown trigger={'click'} options={options}>
        <Button variant='text' className={Style.dropdown}>
          <Icon name='user-circle' className={Style.icon} />
          <span className={Style.text}>Tencent</span>
          <Icon name='chevron-down' className={Style.icon} />
        </Button>
      </Dropdown>
      {/* 5.页面设置 */}
      <Popup content='页面设置' placement='bottom' showArrow destroyOnClose>
        <Button
          className={Style.menuIcon}
          shape='square'
          size='large'
          variant='text'
          onClick={() => dispatch(toggleSetting())}
          icon={<SettingIcon />}
        />
      </Popup>
    </Space>
  );
});

/* <Dropdown trigger={'click'}>
    <Button variant='text' className={Style.dropdown}>
      <Icon name='user-circle' className={Style.icon} />
      <span className={Style.text}>Tencent</span>
      <Icon name='chevron-down' className={Style.icon} />
    </Button>
    <DropdownMenu>
      <DropdownItem onClick={() => navigate('/user/index')}>
        <div className={Style.dropItem}>
          <UserCircleIcon />
          <span>个人中心</span>
        </div>
      </DropdownItem>
      <DropdownItem onClick={handleLogout}>
        <div className={Style.dropItem}>
          <PoweroffIcon />
          <span>退出登录</span>
        </div>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown> */
