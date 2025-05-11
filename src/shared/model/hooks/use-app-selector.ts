import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../types';

/**
 * Хук для получения экземпляра стейта из хранилища
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
