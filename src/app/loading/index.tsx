import {memo} from 'react';
import Head from "@src/ui/layout/head";
import PageLayout from "@src/ui/layout/page-layout";

/**
 * Страница в режиме ожидания загрузки
 * Не должна содержать контейнеры с асинхронной загрузкой (ожидания данных)
 * При этом должна повторять разметку (относительное расположение постоянных элементов),
 * чтобы вёрстка не прыгала
 */
function Loading() {
  return (
    <>
      <p>Загрузка...</p>
    </>
  );
}

export default memo(Loading);
