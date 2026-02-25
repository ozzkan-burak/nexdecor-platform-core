import { create } from 'zustand';

interface CartState {
  items: any[];
  addItem: (item: any) => void;
}

// React 19 ile uyumlu, lightweight store
export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
