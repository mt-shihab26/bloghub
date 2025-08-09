import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TUser } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { authorLink, imageLink, profileSettingsLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export const Profile = ({ user }: { user: TUser }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={imageLink(user.image)} alt={user.name} />
                        <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={authorLink(user)}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={profileSettingsLink()}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('logout')} method="post" as="button">
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
