import type { TShowPost } from '@/types/home';
import type { TPublicPage } from '@/types';

import { useHomeShowStore } from '@/states/use-home-show-store';
import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, imageLink, tagLink, toggleFollowLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';

export const Header = ({ post }: { post: TShowPost }) => {
    const { isZenMode } = useHomeShowStore();
    const { auth } = usePage<TPublicPage>().props;

    return (
        <div className="mb-8">
            {!isZenMode && post.tags && (
                <div className="mt-4 mb-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Link key={tag.slug} href={tagLink(tag)}>
                            <Badge variant="secondary" className="cursor-pointer hover:underline">
                                #{tag.name}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
            <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>

            {!isZenMode && (
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={imageLink(post.user.image)} />
                            <AvatarFallback>{formatInitials(post.user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Link
                                href={authorLink(post.user)}
                                className="font-semibold hover:underline"
                            >
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
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFollowLink(post.user, auth.user)}
                        >
                            {post.followed_by_user ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                </div>
            )}

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
