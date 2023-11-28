// redux 状态管理器
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import global from './modules/global';
import user from './modules/user';

// 1. 合并各模块的 reducer
const reducer = combineReducers({
  global,
  user,
  // listBase,
  // listSelect,
  // listCard,
});

// 2. 创建 store
const store = configureStore({
  reducer,
});

// 3. 定义并暴露全局 store 的类型
export type RootState = ReturnType<typeof store.getState>;

// 4. 定义并暴露全局 dispatch 方法的类型
export type AppDispatch = typeof store.dispatch;

// 5. 定义并暴露获取 dispatch 方法的钩子函数，用于在组件中获取 dispatch 方法
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 6. 定义并暴露获取 store 中的全部状态值的钩子函数，用于在组件中获取 store 中的全部状态值
// TypedUseSelectorHook 用于提供类型声明
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 7. 默认暴露全局 store
export default store;
