import { savePost } from '@/lib/links';
import { useWriteStore } from '@/states/use-write-store';

import { Button } from '@/components/ui/button';
import { ArchiveIcon } from 'lucide-react';

export const Archive = () => {
    const { post } = useWriteStore();

    if (post.status !== 'published') {
        return null;
    }

    return (
        <Button variant="outline" onClick={() => savePost({ ...post, status: 'archived' })}>
            <ArchiveIcon className="mr-2 h-4 w-4" />
            Archive
        </Button>
    );
};
