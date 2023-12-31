import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import locale from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';

import { theme } from 'constants/theme';
import router from './router';
import 'scss/main.scss';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ConfigProvider locale={locale} theme={theme} componentSize={'middle'}>
        {renderRoutes(router)}
      </ConfigProvider>
    </BrowserRouter>
  );
}
