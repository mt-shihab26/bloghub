import type { TPublicPage } from '@/types';
import type { TShowComment } from '@/types/home';
import type { TId } from '@/types/utils';

import { formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, imageLink, toggleCommentLike } from '@/lib/links';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Edit, HeartIcon, Reply } from 'lucide-react';
import { CommentDelete } from './comment-delete';
import { CommentForm } from './comment-form';

export const CommentSingle = ({ postId, comment }: { postId: TId; comment: TShowComment }) => {
    const { auth } = usePage<TPublicPage>().props;

    const [showReply, setShowReply] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const isOwner = auth?.user?.id === comment.user_id;

    return (
        <div className="space-y-4">
            {!isEditing && (
                <div className="overflow-hidden rounded-lg border">
                    <div className="px-6 pt-6 pb-6">
                        <div className="flex items-start space-x-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={imageLink(comment.user?.image)} />
                                <AvatarFallback>{formatInitials(comment.user?.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Link href={authorLink(comment.user)} className="font-semibold hover:underline">
                                            {comment.user?.name}
                                        </Link>
                                        <span className="text-sm text-muted-foreground">
                                            {formatTimeAgo(comment.created_at)}
                                        </span>
                                    </div>
                                    {isOwner && (
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <CommentDelete comment={comment} />
                                        </div>
                                    )}
                                </div>
                                <p className="mb-4">{comment.content}</p>
                                <div className="flex items-center space-x-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={comment.liked_by_user ? 'text-red-500 hover:text-red-500' : ''}
                                        onClick={() => toggleCommentLike(comment)}
                                    >
                                        <HeartIcon className="mr-1 h-4 w-4" />
                                        {comment.likes_count}
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setShowReply((prev) => !prev)}>
                                        <Reply className="mr-1 h-4 w-4" />
                                        Reply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isEditing && (
                <CommentForm
                    postId={postId}
                    commentId={comment.id}
                    comment={comment}
                    onCancel={() => setIsEditing(false)}
                />
            )}
            {showReply && (
                <div className="pl-12">
                    <CommentForm postId={postId} commentId={comment.id} onCancel={() => setShowReply(false)} />
                </div>
            )}
        </div>
    );
};
