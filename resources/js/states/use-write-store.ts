import type { TPost } from '@/types/models';

import { formatSlug } from '@/lib/format';
import { create } from 'zustand';

const defaultPost: TPost = {
    id: '',
    user_id: '',
    image_id: null,
    category_id: null,
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    published_at: '',
    created_at: '',
    updated_at: '',
};

export const useWriteStore = create<{
    post: TPost;
    setPost: (post: TPost) => void;
    setPostKey: <K extends keyof TPost>(key: K, value: TPost[K]) => void;
}>(set => ({
    post: defaultPost,
    setPost: post => set({ post }),
    setPostKey: (key, value) => {
        set(state => {
            const post = { ...state.post, [key]: value };
            if (key === 'title') {
                post.slug = formatSlug(value);
            }
            return { post };
        });
    },
}));
