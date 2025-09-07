import { savePost } from '@/lib/links';
import { useWriteStore } from '@/states/use-write-store';

import { Button } from '@/components/ui/button';
import { CheckCircle, Save } from 'lucide-react';

export const SaveDraft = () => {
    const { post } = useWriteStore();

    return (
        <Button variant="ghost" onClick={() => savePost({ ...post, status: 'draft' })}>
            {post.status === 'draft' ? <Save className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
            {post.status === 'draft' ? 'Save Draft' : 'Convert To Draft'}
        </Button>
    );
};
