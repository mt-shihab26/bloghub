import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const Highlight = <T,>({
    hit,
    field,
    transformer,
    className,
}: {
    hit: THit<T>;
    field: keyof T;
    transformer?: (value: T[keyof T] | undefined) => ReactNode;
    className?: string;
}) => {
    console.log(hit);

    const html = hit?.highlight?.[field]?.snippet;

    if (!html) {
        const text = hit?.document?.[field];
        return <>{transformer ? transformer(text) : text}</>;
    }

    return (
        <span
            className={cn('[&_mark]:bg-yellow-200 [&_mark]:text-foreground dark:[&_mark]:bg-yellow-500/40', className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
