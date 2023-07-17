import React from 'react';
import LayoutContent from '../layout-content';
import themes from '@src/utils/themes';

import './style.less';

interface Props {
  theme?: string | string[];
  children?: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
  center: React.ReactNode;
}

function LayoutHeader(props: Props) {

  const {theme = ''} = props;

  const { left, children, right, center} = props;

  return (
    <div className={themes('LayoutHeader', theme)}>
      <LayoutContent theme={theme}>
        <div className="LayoutHeader__wrap">
          <div className="LayoutHeader__left">{left}</div>
          <div className="LayoutHeader__center">{children || center}</div>
          <div className="LayoutHeader__right">{right}</div>
        </div>
      </LayoutContent>
    </div>
  );
}

export default LayoutHeader;
