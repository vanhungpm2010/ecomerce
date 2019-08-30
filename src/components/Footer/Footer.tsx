import React from 'react';
import { Icon } from 'antd';
import Style from './style.less';

export default () => (
  <footer className={Style.footer}>
    <div style={{ margin: '0px 0px 20px 0px' }}>
      eCommerce 2019 &nbsp;
      <Icon type="copyright" />
      &nbsp; All rights reserved.
    </div>
  </footer>
);
