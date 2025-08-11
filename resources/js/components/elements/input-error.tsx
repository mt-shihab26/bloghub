import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type TProps = HTMLAttributes<HTMLParagraphElement> & { message?: string };

export const InputError = ({ message, className, ...props }: TProps) => {
    return (
        message && (
            <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)}>
                {message}
            </p>
        )
    );
};
