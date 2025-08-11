import type { THomeUser } from '@/types/site';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';

export const PopularAuthors = ({ users }: { users: THomeUser[] }) => {
    return (
        <div className="overflow-hidden rounded-lg border p-5">
            <h2 className="mb-4 text-lg font-semibold">Popular Authors</h2>
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.username} className="flex items-center space-x-3">
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
                ))}
            </div>
        </div>
    );
};
