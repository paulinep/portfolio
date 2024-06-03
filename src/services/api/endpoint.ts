import mc from 'merge-change';
import { AxiosRequestConfig } from 'axios';
import {TServices} from '@src/services/types';
import {IApiService, TEndpointsNames} from "./types";

/**
 * Базовый (абстрактный) класс точки доступа к АПИ
 */
abstract class Endpoint<Config extends AxiosRequestConfig = AxiosRequestConfig> {
  services: TServices;
  api: IApiService;
  config: Config;
  name: TEndpointsNames;

  constructor(config: Patch<Config>, services: TServices, name: TEndpointsNames) {
    this.services = services;
    this.api = this.services.api;
    this.config = mc.patch(this.defaultConfig(), config);
    this.name = name;
  }

  /**
   * Инициализация после создания экземпляра.
   * Вызывается автоматически.
   * Используется, чтобы не переопределять конструктор
   */
  init(){}

  /**
   * Конфигурация по умолчанию.
   * Переопределяется общими параметрами сервиса api и параметрами из конфига экземпляра
   */
  defaultConfig(): Config {
    return {
      url: `/api/v1/${this.name}`,
      //baseURL: '',
      //headers: {},
      //auth:{} base auth
    } as Config;
  }

  /**
   * Запрос
   * @return {*}
   */
  request(options: Config) {
    // Учитываются опции модуля и переданные в аргументах
    return this.api.request(mc.merge(this.config, options as Patch<Config>));
  }
}

export default Endpoint;
