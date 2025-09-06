import { useWriteStore } from '@/states/use-write-store';
import { savePost } from '@/lib/links';

import { Button } from '@/components/ui/button';
import { Save, CheckCircle } from 'lucide-react';

export const SaveDraft = () => {
    const { post } = useWriteStore();

    return (
        <Button variant="ghost" onClick={() => savePost({ ...post, status: 'draft' })}>
            {post.status === 'draft' ? (
                <Save className="w-4 h-4 mr-2" />
            ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
            )}
            {post.status === 'draft' ? 'Save Draft' : 'Convert To Draft'}
        </Button>
    );
};
