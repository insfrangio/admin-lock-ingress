import create from 'zustand';

export interface useStoreTypes {
  isCollapsed: boolean;

  toggleCollapsed: () => void;
}

export const useStore = create<useStoreTypes>((set) => ({
  isCollapsed: false,

  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}));
