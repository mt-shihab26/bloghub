import type { TPost } from '@/types/models';

import { Response } from '@/components/ui/response';

export const Content = ({ post }: { post: TPost }) => {
    return <Response>{post.content}</Response>;
};
