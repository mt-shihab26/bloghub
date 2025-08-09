import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';
import { Footer } from './footer';
import { Header } from './header';

export const SiteLayout = ({ children, title }: { children: ReactNode; title: string }) => {
    return (
        <div className="min-h-screen bg-background">
            <Head title={title} />
            <Header />
            <div className="container mx-auto h-[calc(100vh-35rem)] px-4 py-8">{children}</div>
            <Footer className="h-100" />
        </div>
    );
};
