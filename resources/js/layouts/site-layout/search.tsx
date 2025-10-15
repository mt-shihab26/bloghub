import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('site.search.index'), { q: searchQuery });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-160 pl-10"
            />
        </form>
    );
};
