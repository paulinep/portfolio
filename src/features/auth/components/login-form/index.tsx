import {FormEvent, memo, useCallback, useState} from "react";
import {useTranslate} from "@src/services/i18n/use-i18n";
import {useLocation, useNavigate} from "react-router-dom";
import useServices from "@src/services/use-services";
import Field from "@src/ui/elements/field";
import Input from "@src/ui/elements/input";
import {SignInBody} from "@src/features/auth/api/types";
import useStoreState from "@src/services/store/use-store-state";
import Checkbox from '@src/ui/elements/checkbox';

function LoginForm() {

  const t = useTranslate();
  const location = useLocation();
  const navigate = useNavigate();
  const store = useServices().store;
  const session = useStoreState('session');

  const [data, setData] = useState<SignInBody>({
    login: '',
    password: '',
    remember: true
  });

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback((value: string | boolean, name: string) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    // Отправка данных формы для авторизации
    onSubmit: useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      store.modules.session.signIn(data).then(success => {
        if (success) {
          // Возврат на страницу, с которой пришли
          const back = location.state?.back && location.state?.back !== location.pathname
            ? location.state?.back
            : '/';
          navigate(back);
        }
      });
    }, [data, location.state])
  };

  return (
    <form onSubmit={callbacks.onSubmit}>
      <h2>{t('auth.loginForm.title')}</h2>
      <Field error={session.errors?.login}>
        <Input name="login" placeholder={t('auth.loginForm.login')} value={data.login} size="big" onChange={callbacks.onChange}/>
      </Field>
      <Field error={session.errors?.password}>
        <Input name="password" placeholder={t('auth.loginForm.password')} type="password" size="big" value={data.password} onChange={callbacks.onChange}/>
      </Field>
      <Checkbox
        name="remember"
        value={data.remember}
        label={t('auth.loginForm.rememberMe')}
        onChange={callbacks.onChange}
      />
      <Field error={session.errors?.other}/>
      <Field>
        <button type="submit">{t('auth.signIn')}</button>
      </Field>
    </form>
  );
}

export default memo(LoginForm);
