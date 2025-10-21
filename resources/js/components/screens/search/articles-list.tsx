import type { TSearchPaginated, TSearchPost } from '@/types/search';

import { formatHumanDate, formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, categoryLink, imageLink, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { BookmarkButton } from '@/components/composite/bookmark-button';
import { Highlight } from '@/components/elements/highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Clock, SearchIcon } from 'lucide-react';

export const ArticlesList = ({ articles }: { articles: TSearchPaginated<TSearchPost> }) => {
    return (
        <>
            {articles.data.hits.length > 0 ? (
                <div className="space-y-6">
                    {articles.data.hits.map((post, index) => (
                        <div key={post.document.id} className="flex space-x-2 overflow-hidden rounded-lg border p-4">
                            <div>
                                <Avatar className="size-11">
                                    <AvatarImage src={imageLink(post.document?.user?.image)} />
                                    <AvatarFallback>{formatInitials(post.document?.user?.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="w-full space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex flex-col">
                                            <Link
                                                href={authorLink(post.document.user)}
                                                className="text-sm font-medium hover:underline"
                                            >
                                                <Highlight hit={post} field={['user', 'name']} />
                                            </Link>
                                            <span className="text-sm text-muted-foreground">
                                                {formatHumanDate(post.document.published_at)} (
                                                {formatTimeAgo(post.document.published_at)})
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-2.5">
                                        <Badge className="rounded-full" variant="outline">
                                            {index + 1}
                                        </Badge>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold">
                                    <Link
                                        href={postLink(post.document.user, post.document)}
                                        className="hover:underline"
                                    >
                                        <Highlight hit={post} field="title" />
                                    </Link>
                                </h2>
                                <p className="text-muted-foreground">
                                    <Highlight hit={post} field="excerpt" />
                                </p>
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="flex flex-wrap items-center space-x-2">
                                        {post.document.category && (
                                            <Link href={categoryLink(post.document.category)}>
                                                <Badge
                                                    variant="outline"
                                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                                >
                                                    <Highlight hit={post} field={['category', 'name']} />
                                                </Badge>
                                            </Link>
                                        )}
                                        {post.document.tags?.map((tag, index) => (
                                            <Link key={tag.id} href={tagLink(tag)}>
                                                <Badge
                                                    variant="secondary"
                                                    className="cursor-pointer text-xs hover:underline"
                                                >
                                                    #<Highlight hit={post} field={['tags', 'name']} index={index} />
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap items-center space-x-2">
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                            <Clock className="size-3" />
                                            <span>{readingTime(post.document.content)} min read</span>
                                        </div>
                                        <BookmarkButton post={post.document} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed p-12 text-center">
                    <SearchIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold">No results found</h2>
                    <p className="text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
            )}
        </>
    );
};
