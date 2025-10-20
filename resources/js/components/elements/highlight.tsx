import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const Highlight = <T,>({
    hit,
    field,
    index,
    transformer,
    className,
}: {
    hit: THit<T>;
    field: keyof T;
    index?: number;
    transformer?: (value: T[keyof T] | undefined) => ReactNode;
    className?: string;
}) => {
    const value = hit?.highlight?.[field];

    const html = index !== undefined && Array.isArray(value) ? value?.[index]?.snippet : value?.snippet;

    if (!html) {
        const value = hit?.document?.[field];
        const text = index !== undefined && Array.isArray(value) ? value?.[index] : value;

        return <>{transformer ? transformer(text) : text}</>;
    }

    return (
        <span
            className={cn('[&_mark]:bg-yellow-200 [&_mark]:text-foreground dark:[&_mark]:bg-yellow-500/40', className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
