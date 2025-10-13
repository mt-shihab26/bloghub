import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className="relative hidden md:block">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-160 pl-10"
            />
        </div>
    );
};
