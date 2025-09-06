import type { TPost } from '@/types/models';

import { useAuthUser } from '@/hooks/use-auth-user';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

export const Preview = ({ post }: { post: TPost }) => {
    const { user } = useAuthUser();

    return (
        <a href={route('site.post', { user, post })} target="_blank">
            <Button variant="outline">
                <XIcon className="w-4 h-4 mr-2" />
                Preview
            </Button>
        </a>
    );
};
