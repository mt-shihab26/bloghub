import { ClockIcon, SparklesIcon } from 'lucide-react';

import type { TSearchParams, TSearchSort } from '@/types/search';

import { performSearch } from '@/lib/routes';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SortTabs = ({ params }: { params: TSearchParams }) => {
    return (
        <Tabs
            value={params.sort}
            onValueChange={(sort) => performSearch({ ...params, sort: sort as TSearchSort })}
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
