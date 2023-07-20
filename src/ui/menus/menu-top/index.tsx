import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './style.less';
import detectActive from '@src/features/navigation/detect-active';
import { useTranslate } from '@src/services/i18n/use-i18n';

export default function MenuTop () {
  const t = useTranslate();
  const location = useLocation();
  const ref = React.useRef<HTMLDivElement>(null);

  const options = {
    menu: useMemo(() => detectActive([
      {key: 1, title: t('navigation.main-menu.main'), link: '/', active: false},
      {key: 2, title: t('navigation.main-menu.example-modals'), link: '/example-modals', active: false},
      {key: 3, title: t('navigation.main-menu.example-i18n'), link: '/example-i18n', active: false},
      {key: 5, title: t('navigation.main-menu.catalog'), link: '/catalog', active: false},
      {key: 6, title: t('navigation.main-menu.profile'), link: '/profile', active: false},
    ], location), [location.pathname])
  };

  const handleHover = (visible: boolean)=>(event: React.MouseEvent)=>{
    const { left, width, bottom } = event.currentTarget.getBoundingClientRect();
    if(ref.current){
      if (visible) {
        ref.current.style.left = (left + width / 2).toString() + 'px';
        ref.current.style.width = '2px';
        ref.current.style.maxWidth = width.toString() + 'px';
        ref.current.style.top = bottom.toString() + 'px';
        ref.current.style.transform = `scale(${width/2}, 1)`;
        ref.current.style.transformOrigin = 'center center';
        ref.current.style.transition = 'transform .3s linear 0s';
      }else{
        ref.current.removeAttribute('style');
      }

    }

  };

  return (
    <div className="MenuTop">
      <ul className={'MenuTop__list'} >
        {options.menu.map((item, index) => (
          <li key={index} onMouseEnter={handleHover(true)} onMouseLeave={handleHover(false)} className={cn('MenuTop__item ', { MenuTop__item_active: item.active })}>
            <Link to={item.link} className="MenuTop__link">
              {item.title}
            </Link>

          </li>
        ))}
      </ul>
      <div ref={ref} className={'MenuTop__border'}></div>
    </div>
  );

}

