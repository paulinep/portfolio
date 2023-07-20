import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import './style.less';
import { IMenuTop } from '@src/components/menus/menu-top/types';

export default function MenuTop (props: IMenuTop) {
  const { items } = props;
  const ref = React.useRef<HTMLDivElement>(null);

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
        {items.map((item, index) => (
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

