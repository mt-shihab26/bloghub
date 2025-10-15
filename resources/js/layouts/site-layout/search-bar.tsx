import type { TSearchSort, TSearchType } from '@/types/header';

import { useDebounce } from '@/hooks/use-debounce';
import { performSearch } from '@/lib/routes';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

export const SearchBar = () => {
    const { query = '', sort, type } = usePage<{ query?: string; sort?: TSearchSort; type?: TSearchType }>().props;

    const [search, setSearch] = useState(query);

    useDebounce(
        () => {
            const trimmed = search?.trim();
            if (trimmed) performSearch(trimmed, sort, type);
        },
        400,
        [search],
    );

    return (
        <form
            className="relative hidden md:block"
            onSubmit={(e) => {
                e.preventDefault();
                performSearch(search, sort, type);
            }}
        >
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-160 pr-10 pl-10"
            />
            {search && (
                <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                    onClick={() => {
                        setSearch('');
                        router.get(route('home'));
                    }}
                >
                    <XIcon className="h-4 w-4" />
                </button>
            )}
        </form>
    );
};
