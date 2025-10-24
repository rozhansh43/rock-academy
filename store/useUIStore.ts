// src/store/useUIStore.ts
import { create } from 'zustand';

type UIState = {
  isSidebarDrawerOpen: boolean;
};

type UIActions = {
  openSidebarDrawer: () => void;
  closeSidebarDrawer: () => void;
  toggleSidebarDrawer: () => void;
};

export const useUIStore = create<UIState & UIActions>((set, get) => ({
  // ---- state
  isSidebarDrawerOpen: false,

  // ---- actions
  openSidebarDrawer: () => set({ isSidebarDrawerOpen: true }),
  closeSidebarDrawer: () => set({ isSidebarDrawerOpen: false }),
  toggleSidebarDrawer: () =>
    set({ isSidebarDrawerOpen: !get().isSidebarDrawerOpen }),
}));
