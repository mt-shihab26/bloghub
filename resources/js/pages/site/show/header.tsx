import type { TShowPost } from '@/types/site';

import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, imageLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { readingTime } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';

export const Header = ({ post }: { post: TShowPost }) => {
    return (
        <div className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                    <Badge key={tag.slug} variant="secondary">
                        {tag.name}
                    </Badge>
                ))}
            </div>
            <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>

            {/* Author Info */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={imageLink(post.user.image)} />
                        <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Link href={authorLink(post.user)} className="font-semibold hover:underline">
                            {post.user.name}
                        </Link>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatTimeAgo(post.published_at)}</span>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{readingTime(post.content)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        {post.followed_by_user ? 'Following' : 'Follow'}
                    </Button>
                </div>
            </div>

            {/* Featured Image */}
            <img
                src={imageLink(post.image)}
                alt={post.title}
                width={800}
                height={400}
                className="mb-8 h-64 w-full rounded-lg object-cover md:h-96"
            />
        </div>
    );
};
