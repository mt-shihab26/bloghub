import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { BaseLayout } from '../base-layout';
import { Footer } from './footer';
import { Header } from './header';

export const SiteLayout = ({
    children,
    title,
    className,
    header = true,
    footer = true,
}: {
    children: ReactNode;
    title: string;
    className?: string;
    header?: boolean;
    footer?: boolean;
}) => {
    return (
        <BaseLayout>
            <div className="flex flex-col bg-background">
                <Head title={title} />
                {header && <Header className="h-[3.5rem]" />}
                <main className={cn('container mx-auto px-4 py-8', className)}>{children}</main>
                {footer && <Footer className="min-h-[27.5rem]" />}
            </div>
        </BaseLayout>
    );
};
