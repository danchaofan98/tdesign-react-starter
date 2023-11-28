// global reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETheme } from 'types/index.d';
import { Color } from 'tvision-color';
import { CHART_COLORS, defaultColor } from 'configs/color';
import { generateColorMap, insertThemeStylesheet } from 'utils/color';
import { RootState } from '../store';
import { version } from '../../../package.json';

const namespace = 'global';

// 后面的值默认依次 +1
export enum ELayout {
  side = 1,
  top,
  mix,
  fullPage,
}

// 对象类型接口
export interface IGlobalState {
  loading: boolean;
  collapsed: boolean; // 是否折叠左侧导航栏
  setting: boolean; // 是否打开右侧设置抽屉
  version: string;
  color: string; // 主题颜色
  theme: ETheme; // 主题：深色 浅色
  systemTheme: boolean; // 是否开启跟随系统主题
  layout: ELayout; // 布局模式
  isFullPage: boolean; // 是否全屏（登录页）
  showHeader: boolean; // 是否显示顶部工具栏
  showBreadcrumbs: boolean; // 是否显示面包屑导航
  showFooter: boolean; // 是否显示底部 footer
  chartColors: Record<string, string>; // 图表颜色
}

const defaultTheme = ETheme.light;

// 初始状态
const initialState: IGlobalState = {
  loading: true,
  collapsed: window.innerWidth < 1000, // 宽度小于1000 菜单闭合
  setting: false,
  version,
  theme: defaultTheme,
  systemTheme: false,
  layout: ELayout.side,
  isFullPage: false,
  color: defaultColor?.[0],
  showHeader: true,
  showBreadcrumbs: true,
  showFooter: true,
  chartColors: CHART_COLORS[defaultTheme],
};

// 创建带有命名空间的 slice
// 一个 slice 是指一个包含了一部分状态（state）、对应的 reducer 和 action creators(自动生成) 的逻辑单元
// 例如 dispatch(toggleMenu(true)); 这里的 toggleMenu(true) 就是一个action creator
// 它会自动生成一个动作对象，type 为 namespace/toggleMenu， payload 为 true
// Redux Toolkit 将 slice 作为组织 Redux 逻辑的推荐方式。
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      if (action.payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!action.payload;
      }
    },
    toggleSetting: (state) => {
      state.setting = !state.setting;
    },
    toggleShowHeader: (state) => {
      state.showHeader = !state.showHeader;
    },
    toggleShowBreadcrumbs: (state) => {
      state.showBreadcrumbs = !state.showBreadcrumbs;
    },
    toggleShowFooter: (state) => {
      state.showFooter = !state.showFooter;
    },
    switchTheme: (state, action: PayloadAction<ETheme>) => {
      const finalTheme = action?.payload;
      // 切换 chart 颜色
      state.chartColors = CHART_COLORS[finalTheme];
      // 切换主题颜色
      state.theme = finalTheme;
      // 关闭跟随系统
      state.systemTheme = false;
      document.documentElement.setAttribute('theme-mode', finalTheme);
    },
    openSystemTheme: (state) => {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        const finalTheme = media.matches ? ETheme.dark : ETheme.light;
        state.chartColors = CHART_COLORS[finalTheme];
        // 切换主题颜色
        state.theme = finalTheme;
        state.systemTheme = true;
        document.documentElement.setAttribute('theme-mode', finalTheme);
      }
    },
    switchColor: (state, action) => {
      if (action?.payload) {
        state.color = action?.payload;
        const mode = state.theme;

        const hex = action?.payload;

        const { colors: newPalette, primary: brandColorIndex } = Color.getColorGradations({
          colors: [hex],
          step: 10,
          remainInput: false, // 是否保留输入 不保留会矫正不合适的主题色
        })[0];
        const newColorMap = generateColorMap(hex, newPalette, mode, brandColorIndex);
        insertThemeStylesheet(hex, newColorMap, mode);

        document.documentElement.setAttribute('theme-color', hex || '');
      }
    },
    switchLayout: (state, action) => {
      if (action?.payload) {
        state.layout = action?.payload;
      }
    },
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
  },
  // 处理其他 slice 或全局 action 触发的状态更新。它的作用在于能够在当前 slice 中处理不属于当前 slice 定义的 action
  // 还可以处理异步操作
  extraReducers: () => {},
});

// 定义一个 selector 函数，作为 useSelector 钩子的参数，用于从 Redux store 中获取特定部分的 state
// 相当于 mapStateToProps
export const selectGlobal = (state: RootState) => state.global;

// 对外暴露动作对象；自动创建的 actions，无需手动书写
export const {
  toggleMenu,
  toggleSetting,
  toggleShowHeader,
  toggleShowBreadcrumbs,
  toggleShowFooter,
  switchTheme,
  switchColor,
  switchLayout,
  switchFullPage,
  openSystemTheme,
} = globalSlice.actions;

// 默认对外暴露 reducer
export default globalSlice.reducer;

// 举例说明 extraReducers
/*
// userSlice.js 用户 slice
const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state) => { state.isLoggedIn = true },
    logout: (state) => { state.isLoggedIn = false },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
 */

/*
// cartSlice.js 购物车 slice
import { login } from './userSlice'; // 导入 userSlice 中的 action

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => { state.items.push(action.payload) },
    removeFromCart: (state, action) => { state.items = state.items.filter(item => item.id !== action.payload) },
  },
  extraReducers: (builder) => {
    builder.addCase(login, (state) => {
      state.items = []; // 用户登录时清空购物车
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
 */
