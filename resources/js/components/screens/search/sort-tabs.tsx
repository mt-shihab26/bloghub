import { ClockIcon, SparklesIcon } from 'lucide-react';

import type { TSearchSort, TSearchType } from '@/types/header';

import { performSearch } from '@/lib/routes';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SortTabs = ({ query, sort, type }: { query: string; sort?: TSearchSort; type?: TSearchType }) => {
    return (
        <Tabs
            value={sort}
            onValueChange={(sort) => performSearch(query, sort as TSearchSort, type)}
            className="w-full sm:w-auto"
        >
            <TabsList>
                <TabsTrigger value="relevant">
                    <SparklesIcon className="h-4 w-4" />
                    Most Relevant
                </TabsTrigger>
                <TabsTrigger value="newest">
                    <ClockIcon className="h-4 w-4" />
                    Newest
                </TabsTrigger>
                <TabsTrigger value="oldest">
                    <ClockIcon className="h-4 w-4" />
                    Oldest
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};
