import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';
import { Header } from './header';

export const SiteLayout = ({ children, title }: { children: ReactNode; title: string }) => {
    return (
        <div className="min-h-screen bg-background">
            <Head title={title} />
            <Header />
            <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
    );
};
