import { create } from 'zustand'

const useStore = create((set) => ({
    money: 0,
    addMoney: (amount) => set((state) => ({ money: state.money + amount })),
    removeMoney: (amount) => set((state) => ({ money: state.money - amount })),
    updateMoney: (newMoney) => set({ money: newMoney }),
}))
