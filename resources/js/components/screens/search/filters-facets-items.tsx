import type { TSearchParams } from '@/types/search';
import type { LucideIcon } from 'lucide-react';

import { searchRoute } from '@/lib/search';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@inertiajs/react';

export const FiltersFacetsItems = ({
    icon: Icon,
    title,
    field,
    items,
    selects,
    params,
}: {
    icon: LucideIcon;
    title: string;
    field: string;
    items: { value: string; label: string; count: number }[];
    selects: string[];
    params: TSearchParams;
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="h-4 w-4" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {items.map((item) => {
                    const selected = selects.includes(item.value) ?? false;
                    const newSelects = selected
                        ? (selects.filter((s) => s !== item.value) ?? [])
                        : [...(selects ?? []), item.value];
                    const value = newSelects.length > 0 ? newSelects : null;

                    return (
                        <Link
                            key={item.value}
                            href={searchRoute({ ...params, [field]: value })}
                            preserveState={true}
                            preserveScroll={true}
                            className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                        >
                            <div className="flex items-center gap-3">
                                <Checkbox checked={selected} />
                                <span className="truncate">{item.label}</span>
                            </div>
                            <Badge variant="outline" className="ml-2 shrink-0">
                                {item.count}
                            </Badge>
                        </Link>
                    );
                })}
            </CardContent>
        </Card>
    );
};
