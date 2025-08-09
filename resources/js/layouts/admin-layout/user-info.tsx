import type { TUser } from '@/types/models';

import { formatInitials } from '@/lib/format';
import { imageLink } from '@/lib/links';
import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TAuthPage } from '@/types';

export function UserInfo({ user, showEmail = false }: { user: TUser; showEmail?: boolean }) {
    const { image } = usePage<TAuthPage>().props.auth;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={imageLink(image)} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {formatInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
            </div>
        </>
    );
}
