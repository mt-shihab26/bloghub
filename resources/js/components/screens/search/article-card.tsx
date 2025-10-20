import type { TSearchPost } from '@/types/search';

import { useAuthUser } from '@/hooks/use-auth-user';
import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, categoryLink, categoryName, imageLink, postLink, tagLink, togglePostBookmark } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { BookmarkIcon, Clock } from 'lucide-react';
import { IconButton } from '../home/icon-button';

export const ArticleCard = ({ ith, post }: { ith: number; post: TSearchPost }) => {
    const { bookmarks } = useAuthUser();

    return (
        <div key={post.id} className="overflow-hidden rounded-lg border">
            <div className="flex flex-col md:flex-row">
                <div className="relative p-4 md:w-2/3">
                    <div className="absolute top-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-sm font-semibold text-white">
                        {ith}
                    </div>
                    <div className="mb-2 flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={imageLink(post.user.image)} />
                            <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                        </Avatar>
                        <Link href={authorLink(post.user)} className="text-sm font-medium hover:underline">
                            {post.user.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{formatTimeAgo(post.published_at)}</span>
                    </div>

                    {post.category && (
                        <div className="mb-2">
                            <Link href={categoryLink(post.category)}>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                >
                                    {categoryName(post.category)}
                                </Badge>
                            </Link>
                        </div>
                    )}

                    <h2 className="mb-2 text-xl font-semibold">
                        <Link href={postLink(post.user, post)} className="hover:underline">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{readingTime(post.content)} min read</span>
                        </div>
                    </div>

                    <IconButton
                        active={!!bookmarks?.find((p) => p.id === post.id)}
                        icon={BookmarkIcon}
                        activeColorClass="text-blue-500 hover:text-blue-500"
                        onClick={() => togglePostBookmark(post)}
                    />

                    {post.tags && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Link key={tag.slug} href={tagLink(tag)}>
                                    <Badge variant="secondary" className="cursor-pointer text-xs hover:underline">
                                        #{tag.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
