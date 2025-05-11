import { useDispatch } from 'react-redux';

import { AppDispatch } from '../types';

/**
 * Хук для создания функции dispatch
 * Dispatch выполняет роль диспетчера экшенов
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
