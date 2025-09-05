import type { TShowUser } from '@/types/profile';
import type { TPublicPage } from '@/types';

import { formatHumanDate, formatInitials } from '@/lib/format';
import { imageLink, tagLink, toggleFollowLink } from '@/lib/links';
import { usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Calendar, FileText, Heart, LinkIcon, MapPin, Users } from 'lucide-react';

export const Header = ({ user }: { user: TShowUser }) => {
    const { auth } = usePage<TPublicPage>().props;

    return (
        <div className="flex flex-col items-start space-y-6 rounded-2xl border border-border p-8 md:flex-row md:items-start md:space-y-0 md:space-x-8">
            <Avatar className="h-32 w-32 shadow-lg ring-4 ring-background">
                <AvatarImage src={imageLink(user.image)} />
                <AvatarFallback className="text-3xl">{formatInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <h1 className="mb-2 text-4xl font-bold">{user.name}</h1>
                <p className="mb-4 text-xl text-muted-foreground">@{user.username}</p>
                <p className="mb-6 text-lg leading-relaxed">{user.bio}</p>

                <div className="mb-6 flex flex-wrap items-center gap-6 text-muted-foreground">
                    <div className="flex items-center">
                        <MapPin className="mr-2 h-5 w-5" />
                        {user.location}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Joined {formatHumanDate(user.created_at)}
                    </div>
                    <div className="flex items-center">
                        <LinkIcon className="mr-2 h-5 w-5" />
                        <a
                            href={user.website || ''}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {user.website}
                        </a>
                    </div>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-8 text-sm">
                    <div className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        <span className="text-lg font-bold">{user.followers_count}</span>
                        <span className="ml-1 text-muted-foreground">followers</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-lg font-bold">{user.following_count}</span>
                        <span className="ml-1 text-muted-foreground">following</span>
                    </div>
                    <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        <span className="text-lg font-bold">{user.posts.length}</span>
                        <span className="ml-1 text-muted-foreground">posts</span>
                    </div>
                    <div className="flex items-center">
                        <Heart className="mr-2 h-5 w-5" />
                        <span className="text-lg font-bold">{user.likes_count}</span>
                        <span className="ml-1 text-muted-foreground">likes</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {user.tags?.map(tag => (
                                <Link key={tag.slug} href={tagLink(tag)}>
                                    <Badge
                                        variant="secondary"
                                        className="cursor-pointer text-xs hover:underline"
                                    >
                                        #{tag.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                            EXPERTISE
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {user.expertises?.map(e => (
                                <Badge variant="secondary">{e}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-3">
                <Button
                    onClick={() => toggleFollowLink(user)}
                    variant={user.followed_by_user ? 'outline' : 'default'}
                    size="lg"
                >
                    {user.followed_by_user ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" size="lg">
                    Message
                </Button>
            </div>
        </div>
    );
};
