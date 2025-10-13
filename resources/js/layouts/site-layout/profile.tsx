import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TImage, TUser } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { imageLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export const Profile = ({ user, image }: { user: TUser; image?: TImage }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={imageLink(image)} alt={user.name} />
                        <AvatarFallback>{formatInitials(user.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <Link href={route('site.profile.me')} className="flex flex-col px-4 py-2 text-start hover:underline">
                    <div>{user.email}</div>
                    <div>@{user.username}</div>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('site.dashboard.index')} className="hover:underline">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route('site.write.create')} className="hover:underline">
                        Write
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route('site.reading-list.index')} className="hover:underline">
                        Reading List
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={route('site.settings.index')} className="hover:underline">
                        Settings
                    </Link>
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
