import type { TPublicPage } from '@/types';
import type { ReactNode } from 'react';

import { toast } from '@/lib/toast';
import { usePage } from '@inertiajs/react';

import { Toaster } from '@/components/ui/sonner';

const useToastErrors = () => {
    const { errors } = usePage<TPublicPage>().props;

    for (const key in errors) {
        toast.error(errors[key], {
            action: {
                label: 'Close',
                onClick: () => {},
            },
        });
    }
};

export const BaseLayout = ({ children }: { children: ReactNode }) => {
    useToastErrors();

    return (
        <>
            {children}
            <Toaster position="top-right" />
        </>
    );
};
