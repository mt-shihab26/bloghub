import { useWriteStore } from '@/states/use-write-store';

import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const SaveDraft = () => {
    const { setPostKey } = useWriteStore();

    return (
        <Button variant="ghost" onClick={() => setPostKey('updated_at', new Date().toISOString())}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
        </Button>
    );
};
