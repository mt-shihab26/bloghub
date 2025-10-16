import type { TAuthPage } from '@/types';

import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const { sidebar } = usePage<TAuthPage>().props;

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return <SidebarProvider defaultOpen={sidebar}>{children}</SidebarProvider>;
}
