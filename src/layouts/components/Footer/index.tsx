// Footer 页面底部版权信息栏
import React, { memo } from 'react';
import { Layout, Row } from 'tdesign-react';

import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';

const { Footer: TFooter } = Layout;

export default memo(() => {
  const globalState = useAppSelector(selectGlobal);

  if (!globalState.showFooter) {
    return null;
  }

  return (
    <TFooter>
      <Row justify='center'>Copyright © 2022-{new Date().getFullYear()} Tencent. All Rights Reserved</Row>
    </TFooter>
  );
});
