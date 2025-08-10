import type { TShowPost } from '@/types/site';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink, toogleFollowLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const AuthorBio = ({ post }: { post: TShowPost }) => {
    const { user } = post;

    return (
        <Card className="my-8">
            <CardContent className="pt-6">
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
                        <Button variant="outline" onClick={() => toogleFollowLink(user)}>
                            {post.followed_by_user ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
