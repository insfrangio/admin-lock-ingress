import create from 'zustand';

export interface useStoreTypes {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  token: string;
  setToken: (newToken: string) => void;
}

export const useStore = create<useStoreTypes>((set) => ({
  isCollapsed: false,
  token: '',
  setToken: (newToken) => set(() => ({ token: newToken })),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}));
