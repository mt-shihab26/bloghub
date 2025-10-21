import type { TPublicPage } from '@/types';
import type { TSearchPaginated, TSearchUser } from '@/types/search';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink, toggleFollowLink } from '@/lib/links';
import { usePage } from '@inertiajs/react';

import { Highlight } from '@/components/elements/highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { SearchIcon, UsersIcon } from 'lucide-react';

export const AuthorsList = ({ authors }: { authors: TSearchPaginated<TSearchUser> }) => {
    const { auth } = usePage<TPublicPage>().props;

    return (
        <>
            {authors.data.hits.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {authors.data.hits.map((hit, index) => (
                        <div key={hit.document.id} className="space-y-3 overflow-hidden rounded-lg border p-4">
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={imageLink(hit.document.image)} />
                                        <AvatarFallback>{formatInitials(hit.document.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <Link href={authorLink(hit.document)} className="hover:underline">
                                            <h3 className="font-semibold">
                                                <Highlight hit={hit} field="name" />
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">
                                            @<Highlight hit={hit} field="username" />
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Badge variant="outline" className="rounded-full">
                                        {index + 1}
                                    </Badge>
                                </div>
                            </div>
                            {hit.document.bio && (
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    <Highlight hit={hit} field="bio" />
                                </p>
                            )}
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={() => toggleFollowLink(hit.document, auth?.user)}
                            >
                                <UsersIcon className="mr-2 size-4" />
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">No author found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
