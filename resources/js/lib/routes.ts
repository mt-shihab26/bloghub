import type { TSearchParams } from '@/types/search';

import { router } from '@inertiajs/react';

export const performSearch = ({
    query = '',
    sort = 'relevant',
    type = 'posts',
    author = null,
    category = null,
    tag = null,
}: TSearchParams) => {
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
