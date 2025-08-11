import type { ReactNode } from 'react';

import { Head } from '@inertiajs/react';
import { BaseLayout } from '../base-layout';
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
        <BaseLayout>
            <div className="flex flex-col bg-background">
                <Head title={title} />
                <Header className="h-[4.5rem]" />
                <main className="container mx-auto px-4 py-8">{children}</main>
                {footer && <Footer className="min-h-[27.5rem]" />}
            </div>
        </BaseLayout>
    );
};
