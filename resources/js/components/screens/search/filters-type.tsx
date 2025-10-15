import type { TPublicPage } from '@/types';
import type { TSearchParams, TSearchType } from '@/types/search';

import { performSearch } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkIcon, FileTextIcon, FolderIcon, LucideIcon, TagIcon, UserIcon } from 'lucide-react';

export const FiltersType = ({ params }: { params: TSearchParams }) => {
    const { auth } = usePage<TPublicPage>().props;

    const options: { type: TSearchType; label: string; icon: LucideIcon; description: string }[] = [
        { type: 'posts', label: 'Posts', icon: FileTextIcon, description: 'Search all posts' },
        { type: 'people', label: 'People', icon: UserIcon, description: 'Find users' },
        { type: 'tags', label: 'Tags', icon: TagIcon, description: 'Browse tags' },
        { type: 'categories', label: 'Categories', icon: FolderIcon, description: 'Explore categories' },
    ];

    if (auth?.user) {
        options.push({
            type: 'my-posts',
            label: 'My Posts',
            icon: BookmarkIcon,
            description: 'Only your posts',
        });
    }

    return (
        <aside className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filter by Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {options.map((option) => {
                        const Icon = option.icon;
                        const active = params.type === option.type;

                        return (
                            <button
                                key={option.type}
                                onClick={() => performSearch({ ...params, type: option.type })}
                                className={cn(
                                    'flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors',
                                    active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
                                )}
                            >
                                <Icon className={cn('mt-0.5 h-5 w-5 shrink-0')} />
                                <div className="flex-1">
                                    <div className="font-medium">{option.label}</div>
                                    <div
                                        className={cn(
                                            'text-sm',
                                            active ? 'text-primary-foreground/80' : 'text-muted-foreground',
                                        )}
                                    >
                                        {option.description}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </CardContent>
            </Card>
        </aside>
    );
};
