import { AppStore } from './app-store';

export type RootState = ReturnType<AppStore['getState']>;
