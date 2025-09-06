import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export const wordCount = (content: string): number => {
    return content
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0).length;
};

export const readingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = wordCount(content);
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

    return minutes;
};

export const now = (): string => {
    return new Date().toISOString();
};

export const isFuture = (date: string | null | undefined): boolean => {
    if (!date) return false;
    return new Date(date) > new Date();
};
