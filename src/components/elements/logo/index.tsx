import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import themes from '@src/utils/themes'

import './style.less'

interface Props {
  to: string;
  title: string;
  theme?: string | string[];
}

function Logo(props: Props) {

  const { to = '/', title = '', theme = '' } = props

  return (
    <Link className={themes('Logo', theme)} to={to} title={title}>
      Skeleton
    </Link>
  );
}

export default Logo
