import { router } from '@inertiajs/react';

import type { TSearchSort, TSearchType } from '@/types/header';

export const performSearch = (query: string = '', sort: TSearchSort = 'relevant', type: TSearchType = 'posts') => {
    const q = query.trim();
    if (q) {
        router.get(
            route('site.search.index'),
            {
                q,
                sort: sort !== 'relevant' ? sort : undefined,
                type: type !== 'posts' ? type : undefined,
            },
            {
                preserveState: true,
            },
        );
    }
};
