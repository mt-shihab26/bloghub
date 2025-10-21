import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

import type { TSearchPaginated } from '@/types/search';

import { cn } from '@/lib/utils';

import { Link } from '@inertiajs/react';

export const SearchPagination = <T,>({ data, className }: { data: TSearchPaginated<T>; className?: string }) => {
    console.log(data);

    if (data.total === 0) {
        return null;
    }

    return (
        <div className={cn('flex flex-col items-center justify-between gap-4', className)}>
            <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{data.from}</span> to{' '}
                <span className="font-medium">{data.to}</span> of <span className="font-medium">{data.total}</span>{' '}
                results
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {data.prev_page_url ? (
                            <Link href={data.prev_page_url} preserveState preserveScroll>
                                <PaginationPrevious />
                            </Link>
                        ) : (
                            <PaginationPrevious className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>

                    {data.links
                        .filter((link) => link.page !== null)
                        .filter((link) => !link.label.includes('Previous'))
                        .filter((link) => !link.label.includes('Next'))
                        .map((link, index) => {
                            const isActive = link.active;
                            const isEllipsis = link.label === '...';

                            if (isEllipsis) {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={`page-${link.page}-${index}`}>
                                    {link.url ? (
                                        <Link href={link.url} preserveState preserveScroll>
                                            <PaginationLink isActive={isActive}>{link.page}</PaginationLink>
                                        </Link>
                                    ) : (
                                        <PaginationLink isActive={isActive}>{link.page}</PaginationLink>
                                    )}
                                </PaginationItem>
                            );
                        })}

                    <PaginationItem>
                        {data.next_page_url ? (
                            <Link href={data.next_page_url} preserveState preserveScroll>
                                <PaginationNext />
                            </Link>
                        ) : (
                            <PaginationNext className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
