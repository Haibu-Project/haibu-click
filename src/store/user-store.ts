// store/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  name: string;
  surnames: string;
  username: string;
  email: string;
  verificationCode: string;
  setUser: (user: Partial<UserState>) => void;
  setUserVerificationCode: (code: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      surnames: '',
      username: '',
      email: '',
      verificationCode: '',
      setUser: (user) => set((state) => ({ ...state, ...user })),
      setUserVerificationCode: (code) => set({ verificationCode: code }),
      clearUser: () => set({ name: '', surnames: '', username: '', email: '', verificationCode: '' }),
    }),
    {
      name: 'user-storage',
    }
  )
);
