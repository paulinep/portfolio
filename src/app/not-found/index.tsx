import {memo} from "react";
import {Link} from 'react-router-dom';
import Head from "@src/ui/layout/head";
import MainMenu from "@src/features/navigation/components/main-menu";
import PageLayout from "@src/ui/layout/page-layout";
import useServices from "@src/services/use-services";
import useInit from "@src/services/use-init";
import useUninit from "@src/services/use-uninit";

function NotFound() {

  const routerService = useServices().router;
  // Установка HTTP статуса для корректного рендера на сервере
  useInit(() => routerService.setHttpStatus(404), [], {ssr: 'Not found page'});
  // При переходе к другим страницам сбросить http status
  useUninit(() => routerService.resetHttpStatus());

  return (
    <>
      <h2>404</h2>
      <p>Страница не найдена</p>
      <Link to="/">На главную</Link>
    </>
  );
}

export default memo(NotFound);
