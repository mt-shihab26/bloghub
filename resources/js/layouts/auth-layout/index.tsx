import type { ReactNode } from 'react';

import { BaseLayout } from '../base-layout';

import AuthLayoutTemplate from './auth-simple-layout';

export const AuthLayout = ({ children, ...props }: { children: ReactNode; title: string; description: string }) => {
    return (
        <BaseLayout>
            <AuthLayoutTemplate {...props}>{children}</AuthLayoutTemplate>
        </BaseLayout>
    );
};

export default AuthLayout;
