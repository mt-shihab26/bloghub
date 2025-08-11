import {
    authorLink,
    categoryName,
    imageLink,
    postComments,
    postLikes,
    postLink,
    tagLink,
    togglePostBookmark,
    togglePostLike,
} from '@/lib/links';

import type { TIndexPost } from '@/types/home';

import { formatInitials, formatTimeAgo } from '@/lib/format';
import { cn, readingTime } from '@/lib/utils';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { BookmarkIcon, Clock, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { IconButton } from './icon-button';

export const FeaturedArticles = ({ posts }: { posts: TIndexPost[] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const post = posts[currentIndex];

    if (!post) {
        return null;
    }

    return (
        <section className="mb-8 overflow-hidden rounded-lg border">
            <div className="relative">
                <a href={postLink(post.user, post)}>
                    <img
                        src={imageLink(post.image)}
                        alt={post.title}
                        width={800}
                        height={300}
                        className="h-64 w-full rounded-t-lg object-cover"
                    />
                </a>
                <Badge className="absolute top-4 left-4 bg-primary">{categoryName(post.category)}</Badge>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                    {posts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Show featured post ${index + 1}`}
                            className={cn(
                                'h-3 w-3 cursor-pointer rounded-full transition-colors',
                                index === currentIndex ? 'bg-primary' : 'bg-muted',
                            )}
                        />
                    ))}
                </div>
            </div>
            <header className="p-4">
                <div className="mb-2 flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={imageLink(post.user.image)} />
                        <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <Link href={authorLink(post.user)} className="text-sm font-medium hover:underline">
                        {post.user.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">•</span>
                    <time className="text-sm text-muted-foreground">{formatTimeAgo(post.published_at)}</time>
                </div>
                <h2 className="mb-2 text-2xl font-semibold">
                    <Link href={postLink(post.user, post)} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>
                <p className="text-base text-muted-foreground">{post.excerpt}</p>
            </header>
            <div className="px-4 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <IconButton
                            active={post.liked_by_user}
                            icon={HeartIcon}
                            activeColorClass="text-red-500 hover:text-red-500"
                            onClick={() => togglePostLike(post)}
                        >
                            {postLikes(post)}
                        </IconButton>
                        <IconButton
                            active={post.commented_by_user}
                            icon={MessageCircleIcon}
                            activeColorClass="text-primary hover:text-primary"
                            href={postLink(post.user, post, '#comments')}
                        >
                            {postComments(post)}
                        </IconButton>
                        <IconButton
                            active={post.bookmarked_by_user}
                            icon={BookmarkIcon}
                            activeColorClass="text-blue-500 hover:text-blue-500"
                            onClick={() => togglePostBookmark(post)}
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
                                <Badge variant="secondary" className="cursor-pointer hover:underline">
                                    #{tag.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
