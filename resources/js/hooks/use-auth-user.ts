import type { TPublicPage } from '@/types';

import { usePage } from '@inertiajs/react';

export const useAuthUser = () => {
    const { user, image, bookmarks } = usePage<TPublicPage>().props.auth;
    return { user, image, bookmarks };
};
