import {memo, useCallback, useMemo} from "react";
import {MenuItem} from "@src/components/navigation/menu/types";
import useServices from "@src/utils/hooks/use-services";
import useSelector from "@src/utils/hooks/use-selector";
import SideLayout from "@src/components/layouts/side-layout";
import MenuTop from '@src/components/menus/menu-top';
import { useLocation } from 'react-router-dom';

function Navigation() {
  const store = useServices().store;
  const location = useLocation();

  const select = useSelector(state => ({
    // amount: state.basket.amount,
    // sum: state.basket.sum,
    // lang: state.locale.lang
  }));

  const callbacks = {
    // Обработка перехода на главную
    onNavigate: useCallback((item: MenuItem) => {
      // if (item.key === 3) store.modules.catalog.resetParams();
    }, [store])
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: 'Главная', link: '/', active: location.pathname === '/'},
      {key: 2, title: 'Модалки', link: '/modals-example', active: location.pathname === '/modals-example'},
      {key: 3, title: 'О нас', link: '/about', active: location.pathname === '/about'},
      {key: 4, title: 'Каталог', link: '/catalog', active: location.pathname === '/catalog'},
      {key: 5, title: 'Админка', link: '/private', active: location.pathname === '/private'},
    ]), [location.pathname])
  };

  return (
    <SideLayout side="between">
      <MenuTop items={options.menu} onNavigate={callbacks.onNavigate} theme="montspace"/>
    </SideLayout>
  );
}

export default memo(Navigation);
