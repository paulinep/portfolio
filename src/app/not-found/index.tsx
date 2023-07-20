import {memo} from "react";
import {Link} from 'react-router-dom';
import Head from "@src/components/navigation/head";
import Navigation from "@src/containers/navigation";
import PageLayout from "@src/components/layouts/page-layout";

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
