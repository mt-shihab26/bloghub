import type { THomePost } from '@/types/site';

import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, imageLink, postComments, postLikes, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';
import { router } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { BookmarkIcon, Clock, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { IconButton } from './icon-button';

export const Article = ({ post }: { post: THomePost }) => {
    return (
        <div key={post.id} className="overflow-hidden rounded-lg border">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                    <Link href={postLink(post.user, post)}>
                        <img
                            src={imageLink(post.image)}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="h-48 w-full object-cover md:h-full"
                        />
                    </Link>
                </div>
                <div className="p-4 md:w-2/3">
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

                    <h2 className="mb-2 text-xl font-semibold">
                        <Link href={postLink(post.user, post)} className="hover:underline">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <IconButton
                                active={post.liked_by_user}
                                icon={HeartIcon}
                                activeColorClass="text-red-500"
                                onClick={() => router.post(route('site.posts.like', post))}
                            >
                                {postLikes(post)}
                            </IconButton>
                            <IconButton
                                active={post.commented_by_user}
                                icon={MessageCircleIcon}
                                activeColorClass="text-primary"
                                href={postLink(post.user, post, '#comments')}
                            >
                                {postComments(post)}
                            </IconButton>
                            <IconButton
                                active={post.bookmarked_by_user}
                                icon={BookmarkIcon}
                                activeColorClass="text-blue-500"
                                onClick={() => router.post(route('site.posts.bookmark', post))}
                            />
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{readingTime(post.content)}</span>
                        </div>
                    </div>

                    {post.tags && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Link key={tag.slug} href={tagLink(tag)}>
                                    <Badge variant="secondary" className="cursor-pointer text-xs hover:underline">
                                        {tag.name}
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
