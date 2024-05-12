import { create } from 'zustand'


export const useQueueStore = create()((set) => ({
	activeQueueId: null,
	setActiveQueueId: (id) => set({ activeQueueId: id }),
}))

export const useQueue = () => useQueueStore((state) => state)
	