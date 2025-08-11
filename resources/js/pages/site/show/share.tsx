import type { TShowPost } from '@/types/site';

import { Button } from '@/components/ui/button';
import { Share2Icon } from 'lucide-react';

export const Share = ({ post }: { post: TShowPost }) => {
    return (
        <Button variant="ghost">
            <Share2Icon className="mr-2 h-5 w-5" />
            Share
        </Button>
    );
};
