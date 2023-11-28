import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getContractList, IContract } from 'services/contract';

const namespace = 'list/base';

// 接口类型定义
interface IInitialState {
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  contractList: IContract[];
}

// 初始状态
const initialState: IInitialState = {
  loading: true,
  current: 1,
  pageSize: 10,
  total: 0,
  contractList: [],
};

// 创建异步 action，可以用 dispatch 调用
// dispatch(getList({ pageSize: pageState.pageSize, current: 1 })
export const getList = createAsyncThunk(
  // 动作类型，相当于 toggleMenu 的类型
  `${namespace}/getList`,
  async (params: { pageSize: number; current: number }) => {
    const result = await getContractList(params);
    return {
      list: result?.list,
      total: result?.total,
      pageSize: params.pageSize,
      current: params.current,
    };
  },
);

const listBaseSlice = createSlice({
  // 开启命名空间
  name: namespace,
  initialState,
  reducers: {
    clearPageState: () => initialState,
  },
  // 处理异步 action 的状态变化
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.contractList = action.payload?.list;
        state.total = action.payload?.total;
        state.pageSize = action.payload?.pageSize;
        state.current = action.payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

// 对外暴露动作对象
export const { clearPageState } = listBaseSlice.actions;

// 定义一个 selector 函数，用于从 Redux store 中获取特定部分的 state
export const selectListBase = (state: RootState) => state.listBase;

// 默认暴露 reducer
export default listBaseSlice.reducer;
