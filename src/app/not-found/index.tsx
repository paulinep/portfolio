import {memo} from "react";
import {Link} from 'react-router-dom';
import Head from "@src/ui/navigation/head";
import MainMenu from "@src/features/navigation/components/main-menu";
import PageLayout from "@src/ui/layout/page-layout";

function NotFound() {
  return (
    <>
      <h2>404</h2>
      <p>Страница не найдена</p>
      <Link to="/">На главную</Link>
    </>
  );
}

export default memo(NotFound);
