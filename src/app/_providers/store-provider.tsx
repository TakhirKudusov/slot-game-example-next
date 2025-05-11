'use client';

import { ReactNode, createRef } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/_model';

import { AppStore } from '@/shared/model';

/**
 * Компонент-провайдер хранилища Redux
 * @param children Дочерние компоненты, которые необходимо обернуть
 * @constructor
 */
function StoreProvider({ children }: { children: ReactNode }) {
  /**
   * Ссылка на хранилище
   */
  const storeRef = createRef<AppStore>();

  /**
   * Если хранилище не создано, то создаем новое
   */
  if (!storeRef.current) storeRef.current = store;

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
