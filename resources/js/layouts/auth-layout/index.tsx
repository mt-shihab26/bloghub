import { BaseLayout } from '../base-layout';

import AuthLayoutTemplate from './auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <BaseLayout>
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </BaseLayout>
    );
}
