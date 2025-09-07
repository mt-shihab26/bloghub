import type { TPost } from '@/types/models';

import { useAuthUser } from '@/hooks/use-auth-user';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export const Preview = ({ post }: { post: TPost }) => {
    const { user } = useAuthUser();

    return (
        <a href={route('site.post', { user, post })} target="_blank">
            <Button variant="outline">
                <XIcon className="mr-2 h-4 w-4" />
                Preview
            </Button>
        </a>
    );
};
