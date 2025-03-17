import { useAppConfig } from '#app';
import { SanctumAppConfig } from '../types';

export const useSanctumAppConfig = (): SanctumAppConfig => {
  return (useAppConfig().laravelSanctum ?? {}) as SanctumAppConfig;
};
