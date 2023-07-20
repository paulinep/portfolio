import React from 'react';
import {Route, Routes, Link} from 'react-router-dom';

function Private() {

  return (
    <>
      <h2>Page 1</h2>
      <p>Внутренняя страница для авторизованных</p>
      <p>
        <Link to="/private">Дашборд</Link>
      </p>
      <p>
        <Link to="/private/sub">Sub</Link>
      </p>
      <hr/>
      <Routes>
        <Route index element={<div>Роут Дашборд</div>}/>
        <Route path="sub" element={<div>Роут Sub</div>}/>
      </Routes>
    </>
  );
}

export default React.memo(Private);
