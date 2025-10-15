import type { TPublicPage } from '@/types';
import type { TSearchParams, TSearchType } from '@/types/search';

import { performSearch } from '@/lib/search';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

import { BookmarkIcon, FileTextIcon, FolderIcon, LucideIcon, TagIcon, UserIcon } from 'lucide-react';

export const FiltersType = ({ params }: { params: TSearchParams }) => {
    const { auth } = usePage<TPublicPage>().props;

    const options: { type: TSearchType; label: string; icon: LucideIcon }[] = [
        { type: 'posts', label: 'Posts', icon: FileTextIcon },
        { type: 'people', label: 'People', icon: UserIcon },
        { type: 'tags', label: 'Tags', icon: TagIcon },
        { type: 'categories', label: 'Categories', icon: FolderIcon },
    ];

    if (auth?.user) {
        options.push({
            type: 'my-posts',
            label: 'My Posts',
            icon: BookmarkIcon,
        });
    }

    return (
        <div>
            <div className="flex w-full gap-2 pb-2">
                {options.map((option) => {
                    const Icon = option.icon;
                    const active = params.type === option.type;

                    return (
                        <button
                            key={option.type}
                            onClick={() => performSearch({ ...params, type: option.type })}
                            className={cn(
                                'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                active
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'border bg-background hover:bg-muted',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
