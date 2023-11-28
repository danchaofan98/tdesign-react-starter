// 创建 user reducer slice

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// 1. 定义命名空间
const namespace = 'user';

const TOKEN_NAME = 'tdesign-starter';

// 2. 定义并暴露对象类型接口
export interface IUserState {
  token: string;
  userInfo: Record<string, unknown>;
}

// 3. 定义初始状态
const initialState: IUserState = {
  token: localStorage.getItem(TOKEN_NAME) || 'main_token',
  userInfo: {},
};

export const login = createAsyncThunk(`${namespace}/login`, async (userInfo: Record<string, unknown>) => {
  // 异步
  const mockLogin = async (userInfo: Record<string, unknown>) => {
    console.log(userInfo);
    return {
      code: 200,
      message: '登陆成功',
      data: 'main_token',
    };
  };

  const res = await mockLogin(userInfo);
  if (res.code === 200) {
    return res.data;
  }
  throw res;
});

// 4. 创建带有命名空间的 slice 模块
const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      state.token = '';
      state.userInfo = {};
    },
    remove: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem(TOKEN_NAME, action.payload);
      state.token = action.payload;
    });
  },
});

// 5. 定义并暴露该 slice 的 selector 函数
export const selectUser = (state: RootState) => state.user;

// 6. 暴露 action creator 函数
export const { logout, remove } = userSlice.actions;

// 7. 默认暴露该 slice 的 reducer 函数
export default userSlice.reducer;
