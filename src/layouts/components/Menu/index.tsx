// Menu 导航菜单
import React, { memo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, MenuValue } from 'tdesign-react';
import router, { IRouter } from 'router';
import { resolve } from 'utils/path';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';
import MenuLogo from './MenuLogo';
import Style from './index.module.less';

const { SubMenu, MenuItem, HeadMenu } = Menu;

interface IMenuProps {
  showLogo?: boolean;
  showOperation?: boolean;
}

// NOTE 根据路由递归渲染导航菜单列表
const renderMenuItems = (menu: IRouter[], parentPath = '') => {
  const navigate = useNavigate();
  return menu.map((item) => {
    const { children, meta, path } = item;

    if (!meta || meta?.hidden === true) {
      // 无meta信息 或 hidden == true，路由不显示为菜单
      return null;
    }

    const { Icon, title, single } = meta;
    const routerPath = resolve(parentPath, path);

    if (!children || children.length === 0) {
      return (
        <MenuItem
          key={routerPath}
          value={routerPath}
          icon={Icon ? <Icon /> : undefined}
          onClick={() => navigate(routerPath)}
        >
          {title}
        </MenuItem>
      );
    }

    if (single && children?.length > 0) {
      const firstChild = children[0];
      if (firstChild?.meta && !firstChild?.meta?.hidden) {
        const { Icon, title } = meta;
        const singlePath = resolve(resolve(parentPath, path), firstChild.path);
        return (
          <MenuItem
            key={singlePath}
            value={singlePath}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => navigate(singlePath)}
          >
            {title}
          </MenuItem>
        );
      }
    }

    return (
      <SubMenu key={routerPath} value={routerPath} title={title} icon={Icon ? <Icon /> : undefined}>
        {renderMenuItems(children, routerPath)}
      </SubMenu>
    );
  });
};

// 1.顶部导航菜单
export const HeaderMenu = memo(() => {
  const globalState = useAppSelector(selectGlobal);
  const { pathname } = useLocation();
  const [active, setActive] = useState<MenuValue>(pathname); // todo

  return (
    <HeadMenu
      expandType='popup'
      style={{ marginBottom: 20 }}
      value={active}
      theme={globalState.theme}
      onChange={(v) => setActive(v)}
    >
      {renderMenuItems(router)}
    </HeadMenu>
  );
});

// 2.左侧导航菜单（默认暴露）<Menu />
export default memo((props: IMenuProps) => {
  const { pathname } = useLocation();
  // console.log('pathname', pathname); // /dashboard/base

  const globalState = useAppSelector(selectGlobal);

  const { version } = globalState;
  const bottomText = globalState.collapsed ? version : `TDesign Starter ${version}`;

  return (
    <Menu
      width='232px'
      style={{ flexShrink: 0, height: '100%' }}
      className={Style.menuPanel}
      value={pathname}
      theme={globalState.theme}
      collapsed={globalState.collapsed}
      logo={props.showLogo ? <MenuLogo collapsed={globalState.collapsed} /> : undefined} // 左侧菜单顶部 Logo
      operations={props.showOperation ? <div className={Style.menuTip}>{bottomText}</div> : undefined} // 左侧菜单下方版本号
    >
      {renderMenuItems(router)}
    </Menu>
  );
});
