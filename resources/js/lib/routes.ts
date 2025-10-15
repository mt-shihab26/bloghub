import type { TSearchParams } from '@/types/search';

import { router } from '@inertiajs/react';

export const performSearch = ({
    query = '',
    type = 'posts',
    sort = 'relevant',
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
                type: type !== 'posts' ? type : undefined,
                sort: sort !== 'relevant' ? sort : undefined,
                author: author || undefined,
                category: category || undefined,
                tag: tag || undefined,
            },
            {
                preserveState: true,
            },
        );
    }
};
