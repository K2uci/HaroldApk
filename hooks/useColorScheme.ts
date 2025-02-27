import { create } from 'zustand';

interface ColorSchemeStore {
  isDark: boolean;
  toggleColorScheme: () => void;
}

export const useColorScheme = create<ColorSchemeStore>((set) => ({
  isDark: false,
  toggleColorScheme: () => set((state) => ({ isDark: !state.isDark })),
}));