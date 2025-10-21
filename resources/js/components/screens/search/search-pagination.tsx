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

import { Link, router } from '@inertiajs/react';

export const SearchPagination = <T,>({ data, className }: { data: TSearchPaginated<T>; className?: string }) => {
    if (data.total === 0) {
        return null;
    }

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            <div>
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
                            .filter(
                                (l) => l.page !== null && !l.label.includes('Previous') && !l.label.includes('Next'),
                            )
                            .map((link, index) => {
                                if (link.label === '...') {
                                    return (
                                        <PaginationItem key={`ellipsis-${index}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    );
                                }

                                return (
                                    <PaginationItem key={`page-${link.page}-${index}`}>
                                        {link.url ? (
                                            <PaginationLink
                                                isActive={link.active}
                                                onClick={() =>
                                                    router.visit(link.url || '', {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    })
                                                }
                                            >
                                                {link.page}
                                            </PaginationLink>
                                        ) : (
                                            <PaginationLink isActive={link.active}>{link.page}</PaginationLink>
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
            <div>
                <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{data.from}</span> to{' '}
                    <span className="font-medium">{data.to}</span> of <span className="font-medium">{data.total}</span>{' '}
                    results
                </div>
            </div>
        </div>
    );
};
