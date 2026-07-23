'use client';

import type { PublicConfig } from '@/config/types';
import { createContext, useContext, type ReactNode } from 'react';

const ConfigContext = createContext<PublicConfig | null>(null);

interface ConfigContextProviderProps {
  children: ReactNode;
  config: PublicConfig;
}

export const ConfigContextProvider = ({ children, config }: ConfigContextProviderProps) => (
  <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
);

export const useConfig = (): PublicConfig => {
  const config = useContext(ConfigContext);

  if (!config) {
    throw new Error('useConfig must be used inside ConfigContextProvider');
  }

  return config;
};
