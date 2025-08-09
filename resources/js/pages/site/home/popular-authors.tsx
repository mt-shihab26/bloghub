import type { TUser } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const PopularAuthors = ({ users }: { users: TUser[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Popular Authors</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {users.map((user) => (
                        <div key={user.username} className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={imageLink(user.image)} />
                                    <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Link href={authorLink(user)} className="font-medium hover:underline">
                                        {user.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                                </div>
                            </div>
                            <Button size="sm" variant="outline">
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
