import {memo} from 'react';
import {Link} from 'react-router-dom';

function Main() {

  return (
    <>
      <h2>Главная страница</h2>
      <p>
        <Link to="/private">Раздел для авторизованных</Link>
      </p>
    </>
  );
}

export default memo(Main);
