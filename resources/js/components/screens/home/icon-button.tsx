import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export const IconButton = ({
    active,
    onClick,
    icon,
    activeColorClass,
    children,
    className,
    href,
}: {
    active?: boolean;
    icon: LucideIcon;
    activeColorClass: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    href?: string;
}) => {
    const Icon = icon;
    const iconClassName = 'mr-1 h-4 w-4';

    if (href) {
        return (
            <Button asChild variant="ghost" size="sm" className={cn('cursor-pointer', className, { [activeColorClass]: active })}>
                <Link href={href} className="flex items-center">
                    {active ? <Icon className={iconClassName} fill="currentColor" /> : <Icon className={iconClassName} />}
                    {children}
                </Link>
            </Button>
        );
    }

    return (
        <Button variant="ghost" size="sm" className={cn('cursor-pointer', className, { [activeColorClass]: active })} onClick={onClick}>
            {active ? <Icon className={iconClassName} fill="currentColor" /> : <Icon className={iconClassName} />}
            {children}
        </Button>
    );
};
