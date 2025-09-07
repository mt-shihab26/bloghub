import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge for optimal Tailwind CSS class handling.
 */
export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export const wordCount = (content: string): number => {
    return content
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
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

/**
 * Safely converts a date string to Date object or returns undefined.
 */
export const safeDate = (dateString: string | null | undefined): Date | undefined => {
    if (!dateString) return undefined;
    return new Date(dateString);
};

/**
 * Formats a Date object to YYYY-MM-DD string without timezone issues.
 */
export const extractDate = (date: string | Date | undefined | null): string | undefined => {
    if (!date) return undefined;
    const year = new Date(date).getFullYear();
    const month = String(new Date(date).getMonth() + 1).padStart(2, '0');
    const day = String(new Date(date).getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Extracts time in HH:MM format from a datetime string.
 */
export const extractTime = (dateTime: string | null): string | undefined => {
    if (!dateTime) return undefined;
    return new Date(dateTime).toTimeString().split(' ')[0].slice(0, 5);
};

/**
 * Creates an ISO string for today with specified time.
 */
export const createDateTime = (
    date: string | null | undefined,
    time: string | null | undefined,
): string | undefined => {
    if (!date) return undefined;
    if (!time) return undefined;
    return `${date}T${time}:00.000Z`;
};
