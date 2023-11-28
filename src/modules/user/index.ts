// user reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

const namespace = 'user';
const TOKEN_NAME = 'tdesign-starter';

const initialState = {
  token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
  userInfo: {},
};

// login 用于创建一个包含了异步逻辑的 action creator
// Record<string, unknown> 是 TypeScript 中的一种类型声明。它表示一个对象，该对象的键（key）是字符串类型，值（value）可以是任何类型，即键是字符串，值可以是未知类型
export const login = createAsyncThunk(`${namespace}/login`, async (userInfo: Record<string, unknown>) => {
  const mockLogin = async (userInfo: Record<string, unknown>) => {
    // 登录请求流程
    console.log(userInfo);
    // const { account, password } = userInfo;
    // if (account !== 'td') {
    //   return {
    //     code: 401,
    //     message: '账号不存在',
    //   };
    // }
    // if (['main_', 'dev_'].indexOf(password) === -1) {
    //   return {
    //     code: 401,
    //     message: '密码错误',
    //   };
    // }
    // const token = {
    //   main_: 'main_token',
    //   dev_: 'dev_token',
    // }[password];
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

// getUserInfo 异步 action creator
// 返回一个 Promise
export const getUserInfo = createAsyncThunk(`${namespace}/getUserInfo`, async (_, { getState }: any) => {
  const { token } = getState();
  const mockRemoteUserInfo = async (token: string) => {
    if (token === 'main_token') {
      return {
        name: 'td_main',
        roles: ['all'],
      };
    }
    return {
      name: 'td_dev',
      roles: ['userIndex', 'dashboardBase', 'login'],
    };
  };

  const res = await mockRemoteUserInfo(token);

  return res;
});

// 创建带有命名空间的 slice
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
  // 处理异步操作
  extraReducers: (builder) => {
    builder
      // 根据 Promise 的状态来处理异步操作
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(TOKEN_NAME, action.payload);
        state.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

// 定义一个 selector 函数，相当于 mapStateToProps
export const selectUser = (state: RootState) => state.listBase;

// 对外暴露动作对象；自动创建的 actions，无需手动书写
export const { logout, remove } = userSlice.actions;

// 默认对外暴露 reducer
export default userSlice.reducer;
