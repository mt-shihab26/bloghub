import type { TCategory } from '@/types/models';

import { categoryLink } from '@/lib/links';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const Categories = ({ categories }: { categories: TCategory[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={categoryLink(category)}
                            className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                        >
                            <span className="text-sm font-medium">{category.name}</span>
                            <Badge className={`text-xs`}>{0}</Badge>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
