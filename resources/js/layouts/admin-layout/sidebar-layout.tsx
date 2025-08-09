import type { TBreadcrumbItem } from '@/types/admin';
import type { PropsWithChildren } from 'react';

import { AppContent } from './app-content';
import { AppShell } from './app-shell';
import { AppSidebar } from './app-sidebar';
import { AppSidebarHeader } from './app-sidebar-header';

export function SidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: TBreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
