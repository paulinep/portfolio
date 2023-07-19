import React from "react";
import {HelmetProvider} from "react-helmet-async";
import RouterProvider from '@src/containers/router-provider';
import Services from '@src/services';
import App from '@src/app';
import ServicesProvider from '@src/services/provider';
import defaultConfig from '@src/config';
import {TServicesConfig} from "@src/services/types";

export default async function root(config: TServicesConfig = {}) {
  // Инициализация менеджера сервисов
  const servicesManager = new Services();
  // Через services получаем доступ к store, api, navigation и всем другим сервисам
  const services = await servicesManager.init([defaultConfig, config]);
  // Контекст для метаданных html
  const head = {};

  const Root = () => (
    <ServicesProvider services={services}>
      <RouterProvider navigation={services.navigation}>
        <HelmetProvider context={head}>
          <App/>
        </HelmetProvider>
      </RouterProvider>
    </ServicesProvider>
  );
  return {Root, servicesManager, head};
}
