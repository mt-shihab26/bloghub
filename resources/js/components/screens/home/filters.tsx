import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

type TArticleTab = 'discover' | 'following';
type TDiscoverFilter = 'relevant' | 'week' | 'month' | 'year' | 'all-time' | 'latest';
type TFollowingFilter = 'relevant' | 'latest';

const discoverFilters: { value: TDiscoverFilter; label: string }[] = [
    { value: 'relevant', label: 'Relevant' },
    { value: 'week', label: 'Top this week' },
    { value: 'month', label: 'Top this month' },
    { value: 'year', label: 'Top this year' },
    { value: 'all-time', label: 'Top of all time' },
    { value: 'latest', label: 'Latest' },
];

const followingFilters: { value: TFollowingFilter; label: string }[] = [
    { value: 'relevant', label: 'Relevant' },
    { value: 'latest', label: 'Latest' },
];

export const Filters = () => {
    const [activeTab, setActiveTab] = useState<TArticleTab>('discover');
    const [discoverFilter, setDiscoverFilter] = useState<TDiscoverFilter>('relevant');
    const [followingFilter, setFollowingFilter] = useState<TFollowingFilter>('relevant');

    return (
        <div className="mb-6 flex items-center justify-between rounded-lg border bg-card p-1">
            <div className="flex gap-1">
                <Button
                    variant={activeTab === 'discover' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('discover')}
                >
                    Discover
                </Button>
                <Button
                    variant={activeTab === 'following' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveTab('following')}
                >
                    Following
                </Button>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Filter options</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {activeTab === 'discover' ? (
                        <DropdownMenuRadioGroup
                            value={discoverFilter}
                            onValueChange={(value) => setDiscoverFilter(value as TDiscoverFilter)}
                        >
                            {discoverFilters.map((filter) => (
                                <DropdownMenuRadioItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    ) : (
                        <DropdownMenuRadioGroup
                            value={followingFilter}
                            onValueChange={(value) => setFollowingFilter(value as TFollowingFilter)}
                        >
                            {followingFilters.map((filter) => (
                                <DropdownMenuRadioItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
