import {IProfileState} from "@src/features/auth/store/profile/types";
import StoreModule from "@src/services/store/module";

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule<IProfileState> {

  override defaultState(): IProfileState {
    return {
      data: null,
      waiting: false // признак ожидания загрузки
    };
  }

  /**
   * Загрузка профиля
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.setState({
      data: null,
      waiting: true
    });

    const {data} = await this.services.api.endpoints.users.current({});
    console.log(data)
    // Профиль загружен успешно
    this.setState({
      data: data.result,
      waiting: false
    }, 'Загружен профиль из АПИ');
  }
}

export default ProfileState;
