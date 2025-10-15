import type { TSearchSort, TSearchType } from '@/types/header';

import { performSearch } from '@/lib/routes';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

const TIMEOUT_DELAY_MILLISECONDS = 350;

export const SearchBar = () => {
    const { query, sort, type } = usePage<{ query?: string; sort?: TSearchSort; type?: TSearchType }>().props;

    const [search, setSearch] = useState(query);

    const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearchChange = (value: string) => {
        setSearch(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        const searchQuery = value.trim();

        if (searchQuery) {
            debounceTimeoutRef.current = setTimeout(
                () => performSearch(searchQuery, sort, type),
                TIMEOUT_DELAY_MILLISECONDS,
            );
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
                value={search}
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
