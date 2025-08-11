import type { TShowPost } from '@/types/home';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink, toggleFollowLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export const AuthorBio = ({ post }: { post: TShowPost }) => {
    const { user } = post;

    return (
        <div className="my-8 overflow-hidden rounded-lg border">
            <div className="px-6 pt-6 pb-6">
                <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={imageLink(user.image)} />
                        <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold">
                            <Link href={authorLink(user)} className="hover:underline">
                                {user.name}
                            </Link>
                        </h3>
                        <p className="mb-4 text-muted-foreground">{user?.bio || ''}</p>
                        <Button variant="outline" onClick={() => toggleFollowLink(user)}>
                            {post.followed_by_user ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
