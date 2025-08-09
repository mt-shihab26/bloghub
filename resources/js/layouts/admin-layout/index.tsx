import type { TBreadcrumbItem } from '@/types/admin';
import type { ReactNode } from 'react';

import { SidebarLayout } from './sidebar-layout';

export const AdminLayout = ({
    children,
    breadcrumbs,
    ...props
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumbItem[];
}) => (
    <SidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </SidebarLayout>
);
