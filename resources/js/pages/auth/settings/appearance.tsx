import type { TBreadcrumbItem } from '@/types/admin';

import { AdminLayout } from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/elements/heading-small';
import AppearanceTabs from './appearance-tabs';
import SettingsLayout from './layout';

const breadcrumbs: TBreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AdminLayout>
    );
}
