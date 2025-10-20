import type { THit } from '@/types/search';

import { cn } from '@/lib/utils';

export const Highlight = <T,>({ hit, key, className }: { hit: THit<T>; key: keyof T; className?: string }) => {
    const html = hit?.highlight?.[key]?.snippet;

    if (!html) {
        const text = hit?.document?.[key];
        return <>{text}</>;
    }

    return (
        <span
            className={cn('[&_mark]:bg-yellow-200 [&_mark]:text-foreground dark:[&_mark]:bg-yellow-500/40', className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
