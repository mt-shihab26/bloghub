import type { TComment } from '@/types/models';

import { router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

export const CommentDelete = ({ comment }: { comment: TComment }) => {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(route('site.comments.destroy', comment));
        }
    };

    return (
        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
            <Trash2Icon className="h-4 w-4" />
        </Button>
    );
};
