import create from 'zustand';

export interface useStoreTypes {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  token: string;
  setToken: (newToken: string) => void;

  isOpenModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export const useStore = create<useStoreTypes>((set) => ({
  isCollapsed: false,
  token: '',
  isOpenModal: false,
  setToken: (newToken) => set(() => ({ token: newToken })),
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setOpenModal: (isOpen) => set(() => ({ isOpenModal: isOpen }))
}));
