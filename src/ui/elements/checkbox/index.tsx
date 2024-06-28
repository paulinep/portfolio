import React, {memo, useCallback, useLayoutEffect, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.less';

interface Props {
  value: boolean,
  name: string,
  label?: string,
  onChange: (value: string, name: string) => void,
  delay?: number
}

function Checkbox(props: Props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), props.delay || 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
    onChangeDebounce(e.target.checked);
  };

  // Обновление стейта, если передан новый value
  if (!import.meta.env.SSR) {
    useLayoutEffect(() => setValue(props.value), [props.value]);
  }

  const cn = bem('Checkbox');
  return (
    <div className={cn()}>
      <label>
        {props.label}
        <input
          checked={value}
          type="checkbox"
          onChange={onChange}
        />
        <span className={cn('checkmark')}></span>
      </label>
    </div>

  );
}

export default memo(Checkbox);
