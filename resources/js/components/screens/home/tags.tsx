import type { TTag } from '@/types/models';

import { tagLink } from '@/lib/links';

import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

export const Tags = ({ tags }: { tags: TTag[] }) => {
    return (
        <div className="overflow-hidden rounded-lg border p-5">
            <h2 className="mb-4 text-lg font-semibold">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Link key={tag.slug} href={tagLink(tag)}>
                        <Badge
                            variant="outline"
                            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                            #{tag.name}
                        </Badge>
                    </Link>
                ))}
            </div>
        </div>
    );
};
