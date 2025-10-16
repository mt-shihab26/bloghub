import type { TSearchParams } from '@/types/search';

import { useDebounce } from '@/hooks/use-debounce';
import { searchRoute } from '@/lib/search';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

export const SearchBar = () => {
    const { params } = usePage<{ params: TSearchParams }>().props;

    const [search, setSearch] = useState(params?.query || '');

    const handler = () => {
        const query = search?.trim();
        if (query && params?.query !== query) {
            router.visit(searchRoute({ ...params, query }), { preserveState: true });
        }
    };

    useDebounce(handler, 400, [search]);

    return (
        <div className="relative hidden md:block">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                placeholder="Search articles, authors, categories, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-160 pr-10 pl-10"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handler();
                    }
                }}
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
        </div>
    );
};
