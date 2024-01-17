// 顶部工具栏搜索框
import React, { memo } from 'react';
import { Input } from 'tdesign-react';
import { SearchIcon } from 'tdesign-icons-react';

import Style from './Search.module.less';

export default memo(() => <Input className={Style.panel} prefixIcon={<SearchIcon />} placeholder='请输入搜索内容' />);
