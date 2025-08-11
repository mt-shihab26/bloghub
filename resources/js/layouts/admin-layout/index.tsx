import type { TBreadcrumbItem } from '@/types/admin';
import type { ReactNode } from 'react';

import { BaseLayout } from '../base-layout';
import { SidebarLayout } from './sidebar-layout';

export const AdminLayout = ({
    children,
    breadcrumbs,
    ...props
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumbItem[];
}) => (
    <BaseLayout>
        <SidebarLayout breadcrumbs={breadcrumbs} {...props}>
            {children}
        </SidebarLayout>
    </BaseLayout>
);
