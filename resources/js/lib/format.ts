import { format, formatDistanceToNow } from 'date-fns';

/**
 * Returns the initials from a full name.
 */
export const formatInitials = (fullName: string): string => {
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
export const formatHumanDate = (date: string): string => {
    return format(new Date(date), 'MMMM d, yyyy');
};

/**
 * Returns a human-readable relative time like "12 days ago" or "3 hours ago".
 */
export const formatTimeAgo = (date: string): string => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};
