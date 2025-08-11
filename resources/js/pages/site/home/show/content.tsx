import { TPost } from '@/types/models';

export const Content = ({ post }: { post: TPost }) => {
    return (
        <div className="prose prose-lg mb-8 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
};
