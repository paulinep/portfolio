import {memo} from 'react';
import PageLayout from "@src/ui/layout/page-layout";
import LoginForm from "@src/features/auth/components/login-form";
import {cn as bem} from '@bem-react/classname';
import './style.less';

function LoginPage() {
  const cn = bem('LoginPage');

  return (
    <PageLayout>
      <div className={cn('root')}>
        <LoginForm/>
      </div>

    </PageLayout>
  );
}

export default memo(LoginPage);
