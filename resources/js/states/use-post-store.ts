import { create } from 'zustand';

const defaultIsZenMode: boolean = false;

export const usePostStore = create<{
    isZenMode: boolean;
    setIsZenMode: (isZenMode: boolean) => void;
}>(set => ({
    isZenMode: defaultIsZenMode,
    setIsZenMode: isZenMode => set(() => ({ isZenMode })),
}));
