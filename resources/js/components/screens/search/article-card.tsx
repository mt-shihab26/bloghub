import type { TSearchPost } from '@/types/search';

import { formatHumanDate, formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, categoryLink, categoryName, imageLink, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { BookmarkButton } from '@/components/composite/bookmark-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

export const ArticleCard = ({ ith, post }: { ith: number; post: TSearchPost }) => {
    return (
        <div key={post.id} className="flex space-x-2 overflow-hidden rounded-lg border p-4">
            <div>
                <Avatar className="size-10">
                    <AvatarImage src={imageLink(post.user.image)} />
                    <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                </Avatar>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                            <Link href={authorLink(post.user)} className="text-sm font-medium hover:underline">
                                {post.user.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                {formatHumanDate(post.published_at)} ({formatTimeAgo(post.published_at)})
                            </span>
                        </div>
                    </div>
                    <Badge className="rounded-full" variant="outline">
                        {ith}
                    </Badge>
                </div>
                <h2 className="text-xl font-semibold">
                    <Link href={postLink(post.user, post)} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-wrap items-center space-x-2">
                        {post.category && (
                            <Link href={categoryLink(post.category)}>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                >
                                    {categoryName(post.category)}
                                </Badge>
                            </Link>
                        )}
                        {post.tags?.map((tag) => (
                            <Link key={tag.slug} href={tagLink(tag)}>
                                <Badge variant="secondary" className="cursor-pointer text-xs hover:underline">
                                    #{tag.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center space-x-2">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{readingTime(post.content)} min read</span>
                        </div>
                        <BookmarkButton post={post} />
                    </div>
                </div>
            </div>
        </div>
    );
};
