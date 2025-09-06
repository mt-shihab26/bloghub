import { format, formatDistanceToNow } from 'date-fns';

/**
 * Returns the initials from a full name.
 */
export const formatInitials = (fullName?: string | null): string => {
    if (!fullName) {
        return '';
    }

    const names = fullName.trim().split(' ');

    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
};

/**
 * Formats a date string into a readable long format, e.g., "August 1, 2025".
 */
export const formatHumanDate = (date: string | Date): string => {
    return format(new Date(date), 'MMMM d, yyyy');
};

/**
 * Returns a human-readable relative time like "12 days ago" or "3 hours ago".
 */
export const formatTimeAgo = (date: string | Date | null): string => {
    if (!date) return 'Never';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Converts a string to a URL-friendly slug format.
 */
export const formatSlug = (value: string | undefined | null): string => {
    if (!value) return '';

    return value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

/**
 * Formats a date string into a localized date and time string.
 */
export const formatDateTime = (date: string | Date | null): string => {
    if (!date) return '';
    return new Date(date).toLocaleString();
};
