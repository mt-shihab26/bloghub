import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';
import { Footer } from './footer';
import { Header } from './header';

export const SiteLayout = ({
    children,
    title,
    footer = true,
}: {
    children: ReactNode;
    title: string;
    footer?: boolean;
}) => {
    return (
        <div className="flex flex-col bg-background">
            <Head title={title} />
            <Header className="h-[4.5rem]" />
            <main className="container mx-auto h-[calc(100vh-4.5rem)] px-4 pt-8">{children}</main>
            {footer && <Footer className="min-h-[27.5rem]" />}
        </div>
    );
};
