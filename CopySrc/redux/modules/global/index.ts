// 创建 global reducer slice
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// 1. 定义命名空间
const namespace = 'global';

// 定义并暴露枚举类型
export enum ETheme {
  light = 'light',
  dark = 'dark',
}

// 默认主题
const defaultTheme = ETheme.light;
// 默认颜色数组，可以自定义
export const defaultColor = ['#0052d9', '#0594fa', '#00a870', '#ebb105', '#ed7b2f', '#e34d59', '#ed49b4', '#834ec2'];
// 默认图表主题颜色
export const CHART_COLORS = {
  [ETheme.light]: {
    textColor: 'rgba(0, 0, 0, 0.9)',
    placeholderColor: 'rgba(0, 0, 0, 0.35)',
    borderColor: '#dcdcdc',
    containerColor: '#fff',
  },
  [ETheme.dark]: {
    textColor: 'rgba(255, 255, 255, 0.9)',
    placeholderColor: 'rgba(255, 255, 255, 0.35)',
    borderColor: '#5e5e5e',
    containerColor: '#242424',
  },
};
// 后面的值默认依次 +1
export enum ELayout {
  side = 1,
  top,
  mix,
  fullPage,
}

// 2. 定义并暴露对象类型接口
export interface IGlobalState {
  loading: boolean;
  collapsed: boolean;
  setting: boolean;
  version: string;
  color: string;
  theme: ETheme;
  systemTheme: boolean;
  layout: ELayout;
  isFullPage: boolean;
  showHeader: boolean;
  showBreadcrumbs: boolean;
  showFooter: boolean;
  // Record 是 TypeScript 中的一个泛型类型，用于表示对象类型
  // 其中键（key）是字符串类型，值（value）也是字符串类型
  chartColors: Record<string, string>;
}

// 3. 定义初始状态
const initialState: IGlobalState = {
  loading: true,
  collapsed: window.innerWidth < 1000, // 宽度小于1000 菜单闭合
  setting: false,
  version: '0.3.1',
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

// 4. 创建带有命名空间的 slice 模块，作为 redux 的组成单元（自动生成 action creator 函数）
const globalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      if (action?.payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!action?.payload;
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
      state.chartColors = CHART_COLORS[finalTheme];
      state.theme = finalTheme;
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
    switchLayout: (state, action) => {
      if (action?.payload) {
        state.layout = action?.payload;
      }
    },
    switchFullPage: (state, action) => {
      state.isFullPage = !!action?.payload;
    },
  },
  extraReducers: () => {},
});

// 5. 定义并暴露该 slice 的 selector 函数，作为 useSelector 钩子函数的参数，用于获取该 slice 的状态值
export const selectGlobal = (state: RootState) => state.global;

// 6. 暴露 action creator 函数（自动生成的）
export const {
  toggleMenu,
  toggleSetting,
  toggleShowHeader,
  toggleShowBreadcrumbs,
  toggleShowFooter,
  switchTheme,
  switchLayout,
  switchFullPage,
  openSystemTheme,
} = globalSlice.actions;

// 7. 默认暴露该 slice 的 reducer 函数
export default globalSlice.reducer;
