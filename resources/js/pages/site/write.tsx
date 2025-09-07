import type { TPost } from '@/types/models';

import { formatTimeAgo } from '@/lib/format';
import { readingTime, wordCount } from '@/lib/utils';
import { useWriteStore } from '@/states/use-write-store';
import { useEffect } from 'react';

import { PostStatus } from '@/components/composite/post-status';
import { Archive } from '@/components/screens/write/archive';
import { Category } from '@/components/screens/write/category';
import { Content } from '@/components/screens/write/content';
import { Excerpt } from '@/components/screens/write/excerpt';
import { FeaturedImage } from '@/components/screens/write/featured-image';
import { Preview } from '@/components/screens/write/preview';
import { Publish } from '@/components/screens/write/publish';
import { SaveDraft } from '@/components/screens/write/save-draft';
import { Slug } from '@/components/screens/write/slug';
import { Tags } from '@/components/screens/write/tags';
import { Title } from '@/components/screens/write/title';
import { SiteLayout } from '@/layouts/site-layout';
import { Clock, FileText, History } from 'lucide-react';

const Write = ({ post: passPost }: { post?: TPost }) => {
    const { post, setPost } = useWriteStore();

    useEffect(() => {
        if (passPost) {
            setPost(passPost);
        }
    }, []);

    return (
        <SiteLayout title="Write" footer={false}>
            <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
                <div className="flex h-[4.45rem] items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <PostStatus post={post} />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>{wordCount(post.content)} words</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{readingTime(post.content)} min read</span>
                            </div>
                        </div>
                        <div className="hidden items-center space-x-1 text-sm text-muted-foreground md:flex">
                            <History className="h-4 w-4" />
                            <span>{formatTimeAgo(post.updated_at)}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SaveDraft />
                        <Archive />
                        <Publish />
                        <Preview post={post} />
                    </div>
                </div>
            </div>
            <div className="space-y-8 px-4 py-8">
                <Content />
                <Title />
                <Slug />
                <Excerpt />
                <FeaturedImage />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <Category />
                    <Tags />
                </div>
            </div>
        </SiteLayout>
    );
};

export default Write;
