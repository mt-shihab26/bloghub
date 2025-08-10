import type { TShowComment } from '@/types/site';

import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, imageLink } from '@/lib/links';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Reply, ThumbsUp } from 'lucide-react';

export const CommentSingle = ({ comment }: { comment: TShowComment }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={imageLink(comment.user?.image)} />
                        <AvatarFallback>{formatInitials(comment.user?.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                            <Link href={authorLink(comment.user)} className="font-semibold hover:underline">
                                {comment.user?.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">{formatTimeAgo(comment.created_at)}</span>
                        </div>
                        <p className="mb-4">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className={comment.liked_by_user ? 'text-red-500' : ''}>
                                <ThumbsUp className="mr-1 h-4 w-4" />
                                {comment.likes_count}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Reply className="mr-1 h-4 w-4" />
                                Reply
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
