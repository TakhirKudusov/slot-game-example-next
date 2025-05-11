import { useStore } from 'react-redux';

import { AppStore } from '../types';

/**
 * Хук для получения экземпляра хранилища
 */
export const useAppStore = useStore<AppStore>;
