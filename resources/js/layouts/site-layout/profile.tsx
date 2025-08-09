import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TUser } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { imageLink, profileMeLink, profileSettingsLink } from '@/lib/links';

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
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col px-4 py-3">
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={profileMeLink()}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={profileSettingsLink()}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('logout')} className="w-full" method="post" as="button">
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
