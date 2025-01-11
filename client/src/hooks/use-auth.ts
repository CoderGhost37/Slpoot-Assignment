import jwt from 'jsonwebtoken';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  login: (token: string) =>
    set({
      isAuthenticated: true,
      user: jwt.decode(token) as User,
    }),
  logout: () => {
    document.cookie = 'authToken=; path=/; max-age=0';
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
