import type { TPublicPage } from '@/types';

import { profileWriteLink } from '@/lib/links';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { Notification } from './notification';
import { Profile } from './profile';

export const Header = ({ className }: { className: string }) => {
    const { name, auth } = usePage<TPublicPage>().props;
    const { user } = auth;

    const [searchQuery, setSearchQuery] = useState('');

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
                        <div className="relative hidden md:block">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Notification />
                                <Button asChild>
                                    <Link href={profileWriteLink()} className="text-sm font-medium hover:underline">
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
                                <Profile user={user} />
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
