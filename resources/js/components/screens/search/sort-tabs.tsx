import type { TSearchParams, TSearchSort } from '@/types/search';

import { searchRoute } from '@/lib/search';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ClockIcon, SparklesIcon } from 'lucide-react';

export const SortTabs = ({ params }: { params: TSearchParams }) => {
    const tabs = [
        { value: 'relevant', label: 'Most Relevant', icon: SparklesIcon },
        { value: 'newest', label: 'Newest', icon: ClockIcon },
        { value: 'oldest', label: 'Oldest', icon: ClockIcon },
    ];

    return (
        <Tabs value={params.sort} className="w-full sm:w-auto">
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} asChild>
                        <Link href={searchRoute({ ...params, sort: tab.value as TSearchSort })} preserveState={true}>
                            <tab.icon className="size-4" />
                            {tab.label}
                        </Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};
