import { useWriteStore } from '@/states/use-write-store';
import { router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const SaveDraft = () => {
    const { post } = useWriteStore();

    const handle = () => {
        if (post.id) {
            router.patch(route('site.write.update', post), post);
        } else {
            router.post(route('site.write.save'), post);
        }
    };

    return (
        <Button variant="ghost" onClick={handle}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
        </Button>
    );
};
