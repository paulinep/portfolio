import {lazy, memo, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Modals from '@src/services/modals/container';
import Loading from '@src/app/loading';
import ExampleCanvasPage from "@src/features/example-canvas/page";

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

function App() {
  return (
    <>
      <Helmet>
        <html lang="en"/>
        <title>React Skeleton!</title>
        <meta name="description" content="React skeleton example"/>
      </Helmet>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" index element={<Main/>}/>
          <Route path="/example-canvas" index element={<ExampleCanvasPage/>}/>
          <Route path="/catalog" element={<Catalog/>}/>
          <Route path="/catalog/:categoryId" element={<Catalog/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
      <Modals/>
    </>
  );
}


export default memo(App);
