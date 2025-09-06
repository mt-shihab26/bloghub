import { useWriteStore } from '@/states/use-write-store';
import { savePost } from '@/lib/links';

import { Button } from '@/components/ui/button';
import { ArchiveIcon } from 'lucide-react';

export const Archive = () => {
    const { post } = useWriteStore();

    if (post.status !== 'published') {
        return null;
    }

    return (
        <Button variant="outline" onClick={() => savePost({ ...post, status: 'archived' })}>
            <ArchiveIcon className="w-4 h-4 mr-2" />
            Archive
        </Button>
    );
};
