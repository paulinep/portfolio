import {lazy, memo, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Modals from '@src/services/modals/container';
import Loading from '@src/app/loading';
import Head from '@src/ui/navigation/head';
import PageLayout from "@src/ui/layout/page-layout";


// Синхронный импорт
// import Main from '@src/features/main/page';
// import Login from '@src/features/auth/pages/login';
// import Catalog from '@src/features/catalog/page';
// import NotFound from '@src/app/not-found';

// Динамический импорт станиц
const Main = lazy(() => import('@src/features/main/page'));
const Login = lazy(() => import('@src/features/auth/pages/login'));
const Catalog = lazy(() => import('@src/features/catalog/page'));
const Profile = lazy(() => import('@src/features/auth/pages/profile'));
const NotFound = lazy(() => import('@src/app/not-found'));
const ExampleModals = lazy(() => import('@src/features/example-modals/page'));
const ExampleI18n = lazy(() => import('@src/features/example-i18n/page'));

function App() {
  return (
    <>
      <Helmet>
        <html lang="en"/>
        <title>Example</title>
        <meta name="description" content="React skeleton example"/>
      </Helmet>
      <PageLayout>
        <Head title="React Skeleton">
          {/*<Navigation/>*/}
        </Head>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" index element={<Main />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:categoryId" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Modals />
      </PageLayout>
    </>
  );
}


export default memo(App);
