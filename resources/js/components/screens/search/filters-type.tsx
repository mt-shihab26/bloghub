import type { TPublicPage } from '@/types';
import type { TSearchParams, TSearchType } from '@/types/search';

import { searchRoute } from '@/lib/search';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

import { BookmarkIcon, FileTextIcon, FolderIcon, LucideIcon, TagIcon, UserIcon } from 'lucide-react';

export const FiltersType = ({ params }: { params: TSearchParams }) => {
    const { auth } = usePage<TPublicPage>().props;

    const options: { type: TSearchType; label: string; icon: LucideIcon }[] = [
        { type: 'articles', label: 'Articles', icon: FileTextIcon },
        { type: 'authors', label: 'Authors', icon: UserIcon },
        { type: 'categories', label: 'Categories', icon: FolderIcon },
        { type: 'tags', label: 'Tags', icon: TagIcon },
    ];

    if (auth?.user) {
        options.push({
            type: 'my-articles',
            label: 'My Articles',
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
                        <Link
                            key={option.type}
                            href={searchRoute({ query: params.query, type: option.type })}
                            preserveState={true}
                            className={cn(
                                'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                active
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'border bg-background hover:bg-muted',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {option.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
