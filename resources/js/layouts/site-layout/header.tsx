import type { TPublicPage } from '@/types';

import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Notification } from './notification';
import { Profile } from './profile';
import { Search } from './search';

export const Header = ({ className }: { className: string }) => {
    const { name, auth } = usePage<TPublicPage>().props;
    const { user, image } = auth;

    return (
        <header
            className={cn(
                'sticky top-0 z-50 flex flex-col justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                className,
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-2xl font-bold text-primary">
                            {name}
                        </Link>
                        <Search />
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Button asChild>
                                    <Link
                                        href={route('site.write.create')}
                                        className="text-sm font-medium hover:underline"
                                    >
                                        Write
                                    </Link>
                                </Button>
                                {user.role === 'admin' && (
                                    <Button variant="secondary" asChild>
                                        <Link href={route('admin')} className="text-sm font-medium hover:underline">
                                            Admin
                                        </Link>
                                    </Button>
                                )}
                                <Notification />
                                <Profile user={user} image={image} />
                            </>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={route('login')}>Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('register')}>Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
