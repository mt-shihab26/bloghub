import type { TPost } from '@/types/models';

import { useWriteStore } from '@/states/use-write-store';
import { readingTime, wordCount } from '@/lib/utils';
import { formatTimeAgo } from '@/lib/format';

import { FileText, Clock, History } from 'lucide-react';
import { SiteLayout } from '@/layouts/site-layout';
import { Title } from '@/components/screens/write/title';
import { Content } from '@/components/screens/write/content';
import { Excerpt } from '@/components/screens/write/excerpt';
import { FeaturedImage } from '@/components/screens/write/featured-image';
import { Category } from '@/components/screens/write/category';
import { Tags } from '@/components/screens/write/tags';
import { Slug } from '@/components/screens/write/slug';
import { SaveDraft } from '@/components/screens/write/save-draft';
import { Publish } from '@/components/screens/write/publish';
import { Preview } from '@/components/screens/write/preview';
import { useEffect } from 'react';

const Write = ({ post }: { post?: TPost }) => {
    const {
        post: { content, updated_at },
        setPost,
    } = useWriteStore();

    useEffect(() => {
        if (post) {
            setPost(post);
        }
    }, []);

    return (
        <SiteLayout title="Write" footer={false}>
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 sticky top-0 z-50">
                <div className="h-[4.45rem] flex items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <FileText className="w-4 h-4" />
                                <span>{wordCount(content)} words</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{readingTime(content)} min read</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
                            <History className="w-4 h-4" />
                            <span>{formatTimeAgo(updated_at)}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <SaveDraft />
                        <Preview />
                        <Publish />
                    </div>
                </div>
            </div>
            <div className="px-4 py-8 space-y-8">
                <Content />
                <Title />
                <Slug />
                <Excerpt />
                <FeaturedImage />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Category />
                    <Tags />
                </div>
            </div>
        </SiteLayout>
    );
};

export default Write;
