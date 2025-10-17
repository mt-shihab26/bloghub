import type { TPublicPage } from '@/types';
import type { TSearchPaginated, TSearchUser } from '@/types/search';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink, toggleFollowLink } from '@/lib/links';
import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { InfiniteScroll, Link } from '@inertiajs/react';
import { SearchIcon, UsersIcon } from 'lucide-react';

export const AuthorsList = ({ authors }: { authors: TSearchPaginated<TSearchUser> }) => {
    const { auth } = usePage<TPublicPage>().props;

    return (
        <>
            {authors.data.length > 0 ? (
                <InfiniteScroll data="authors" preserveUrl>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {authors.data.map((user, index) => (
                            <div key={user.id} className="overflow-hidden rounded-lg border p-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={imageLink(user.image)} />
                                        <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <Link href={authorLink(user)} className="hover:underline">
                                            <h3 className="font-semibold">{user.name}</h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                                    </div>
                                </div>

                                {user.bio && (
                                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{user.bio}</p>
                                )}

                                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>
                                        <strong className="font-semibold text-foreground">
                                            {user.posts_count || 0}
                                        </strong>{' '}
                                        posts
                                    </span>
                                    <span>
                                        <strong className="font-semibold text-foreground">
                                            {user.followers_count || 0}
                                        </strong>{' '}
                                        followers
                                    </span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4 w-full"
                                    onClick={() => toggleFollowLink(user, auth?.user)}
                                >
                                    <UsersIcon className="mr-2 h-4 w-4" />
                                    Follow
                                </Button>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">No people found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
