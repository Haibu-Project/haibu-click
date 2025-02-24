import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  name: string;
  lastname: string;
  username: string;
  email: string;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      lastname: '',
      username: '',
      email: '',
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () => set({ name: '', lastname: '', username: '', email: '' }),
    }),
    {
      name: 'user-storage',
    }
  )
);
