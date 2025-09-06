import type { TIndexCategory } from '@/types/home';

import { categoryLink } from '@/lib/links';

import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

export const Categories = ({ categories }: { categories: TIndexCategory[] }) => {
    return (
        <div className="overflow-hidden rounded-lg border p-5">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <div className="space-y-2">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={categoryLink(category)}
                        className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                    >
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge className="text-xs">{category.posts_count || 0}</Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
};
