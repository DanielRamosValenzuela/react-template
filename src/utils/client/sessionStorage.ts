import type { StateStorage } from 'zustand/middleware';

export const browserSessionStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage.getItem(name);
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(name, value);
  },
};