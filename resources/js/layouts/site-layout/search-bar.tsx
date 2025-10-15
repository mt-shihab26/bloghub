import type { TSearchSort, TSearchType } from '@/types/header';

import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

export const SearchBar = () => {
    const { props } = usePage<{ query?: string; sort?: TSearchSort; type?: TSearchType }>();
    const { query = '', sort = 'relevant', type = 'posts' } = props;

    const [search, setSearch] = useState(query);

    const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const performSearch = (searchQuery: string) => {
        if (searchQuery.trim()) {
            router.get(route('site.search.index'), {
                q: searchQuery.trim(),
                sort: sort !== 'relevant' ? sort : undefined,
                type: type !== 'posts' ? type : undefined,
            });
        }
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (value.trim()) {
            debounceTimeoutRef.current = setTimeout(() => performSearch(value), 500);
        }
    };

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    return (
        <form
            className="relative hidden md:block"
            onSubmit={(e) => {
                e.preventDefault();
                if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
                performSearch(search);
            }}
        >
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                placeholder="Search articles..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-160 pr-10 pl-10"
            />
            {search && (
                <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-muted-foreground hover:text-foreground"
                    onClick={() => {
                        setSearch('');
                        if (debounceTimeoutRef.current) {
                            clearTimeout(debounceTimeoutRef.current);
                        }
                        router.get(route('home'));
                    }}
                >
                    <XIcon className="h-4 w-4" />
                </button>
            )}
        </form>
    );
};
