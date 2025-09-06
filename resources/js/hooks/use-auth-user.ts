import type { TPublicPage } from '@/types';

import { usePage } from '@inertiajs/react';

export const useAuthUser = () => {
    const { user } = usePage<TPublicPage>().props.auth;
    return { user };
};
