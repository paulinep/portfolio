import React from 'react';
import themes from '@src/utils/themes';

import './style.less';

interface Props {
  theme?: string | string[];
  children: React.ReactNode;
}

function LayoutContent(props: Props) {

  const { children, theme = [ 'default' ] } = props;

  return <div className={themes('LayoutContent', theme)}>{children}</div>;
}

export default LayoutContent;
