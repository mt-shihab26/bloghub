import { create } from 'zustand';

const defaultIsZenMode: boolean = false;

export const useHomeShowStore = create<{
    isZenMode: boolean;
    setIsZenMode: (isZenMode: boolean) => void;
}>(set => ({
    isZenMode: defaultIsZenMode,
    setIsZenMode: isZenMode => set(() => ({ isZenMode })),
}));
