import React, { useCallback, useEffect, useMemo, useState } from 'react';
import detectActive from '@src/utils/detect-active';
import LayoutHeader from '@src/components/layouts/layout-header';
import MenuTop from '@src/components/menus/menu-top';
import Button from '@src/components/elements/button';
import Logo from '@src/components/elements/logo';
import { useLocation } from 'react-router-dom';
import useSelector from '@src/utils/hooks/use-selector';
import useServices from '@src/utils/hooks/use-services';
import { TStoreState } from '@src/services/store/types';
import { ISessionState } from '@src/services/store/session/types';

function HeaderContainer() {
  const select: {session: ReturnType<ISessionState>} = useSelector((state: TStoreState) => ({
    session: state.session,
  }));

  const location = useLocation();

  const [items, changeItems] = useState(
    detectActive(
      [
        { title: 'Главная', to: '/', active: false },
        { title: 'О нас', to: '/about', active: false },
        { title: 'Каталог', to: '/catalog', active: false },
        { title: 'Админка', to: '/private', active: false },
      ],
      location,
    ),
  );

  useEffect(() => {
    changeItems(detectActive(items, location));
  }, [location]);

  const services = useServices();

  const callbacks = {
    onClickLogin: useCallback(() => {
      services.navigation.push('/login');
    }, []),

    onClickLogout: useCallback(() => {
      services.store.actions.session.clear();
    }, []),
  };

  const renders = {
    right: useMemo(() => {
      const result = [];
      if (select.session.exists) {
        result.push(
          <Button key={1} theme={['clear-white', 'margins']} onClick={callbacks.onClickLogout}>
            Выход
          </Button>,
        );
      } else {
        result.push(
          <Button key={1} theme={['clear-white', 'margins']} onClick={callbacks.onClickLogin}>
            Вход
          </Button>,
        );
      }
      return result;
    }, [select.session, callbacks.onClickLogout, callbacks.onClickLogin]),
  };

  return <LayoutHeader left={<Logo theme={'montspace'} />} right={renders.right} theme="montspace" center={<MenuTop items={items} />} />;
}

export default React.memo(HeaderContainer);
