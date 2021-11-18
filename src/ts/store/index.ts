import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set: any) => ({
      user: null,

      isDarkTheme: true,

      toggleTheme: () => {
        set((state: any) => ({ isDarkTheme: !state.isDarkTheme }));
      },

      setUser: (user: any) => {
        set({ user });
      },

      resetUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'reddit-clone-state',
    },
  ),
);

export default useStore;
