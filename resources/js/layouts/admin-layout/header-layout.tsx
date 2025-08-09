import type { TBreadcrumbItem } from '@/types/admin';
import type { PropsWithChildren } from 'react';

import { AppContent } from './app-content';
import { AppHeader } from './app-header';
import { AppShell } from './app-shell';

export function HeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: TBreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
