import type { TShowUser } from '@/types/profile';

import { formatTimeAgo } from '@/lib/format';
import { imageLink, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PostStatus } from '@/components/composite/post-status';
import { Link } from '@inertiajs/react';
import { Bookmark, Clock, Heart, MessageCircle } from 'lucide-react';

export const LatestPosts = ({ user }: { user: TShowUser }) => {
    return (
        <div className="space-y-8 lg:col-span-2">
            <div>
                <h2 className="mb-6 text-2xl font-bold">Latest Posts</h2>
                <div className="space-y-8">
                    {user.posts?.map(post => (
                        <div
                            key={post.id}
                            className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3">
                                    <img
                                        src={imageLink(post.image)}
                                        alt={post.title}
                                        width={300}
                                        height={200}
                                        className="h-48 w-full object-cover md:h-full"
                                    />
                                </div>
                                <div className="p-6 md:w-2/3">
                                    <div className="mb-3 flex items-center space-x-2 text-sm text-muted-foreground">
                                        <PostStatus post={post} />
                                        <span>•</span>
                                        <span>{formatTimeAgo(post.published_at)}</span>
                                        <span>•</span>
                                        <div className="flex items-center">
                                            <Clock className="mr-1 h-4 w-4" />
                                            {readingTime(post.content)} min read
                                        </div>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold">
                                        <Link
                                            href={route('site.post', { user, post })}
                                            className="transition-colors hover:text-primary"
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mb-4 leading-relaxed text-muted-foreground">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={
                                                    post.liked_by_user
                                                        ? 'text-destructive hover:text-destructive/80'
                                                        : 'hover:text-destructive'
                                                }
                                            >
                                                <Heart className="mr-1 h-4 w-4" />
                                                {post.likes_count}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={
                                                    post.commented_by_user
                                                        ? 'text-primary hover:text-primary/80'
                                                        : 'hover:text-primary'
                                                }
                                                asChild
                                            >
                                                <Link href={postLink(user, post, '#comments')}>
                                                    <MessageCircle className="mr-1 h-4 w-4" />
                                                    {post.comments_count}
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={
                                                    post.bookmarked_by_user
                                                        ? 'text-primary hover:text-primary/80'
                                                        : 'hover:text-primary'
                                                }
                                            >
                                                <Bookmark className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {post.tags?.map(tag => (
                                            <Link key={tag.slug} href={tagLink(tag)}>
                                                <Badge
                                                    variant="secondary"
                                                    className="cursor-pointer transition-colors hover:bg-primary/10 hover:text-primary"
                                                >
                                                    #{tag.name}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
