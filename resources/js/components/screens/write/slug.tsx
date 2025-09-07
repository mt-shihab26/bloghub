import { formatSlug } from '@/lib/format';
import { useWriteStore } from '@/states/use-write-store';

import { Input } from '@/components/ui/input';
import { Link } from 'lucide-react';

export const Slug = () => {
    const { post, setPostKey } = useWriteStore();

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Link className="h-5 w-5" />
                <h3 className="font-medium">Slug</h3>
            </div>

            <Input
                id="slug"
                placeholder="my-awesome-article"
                value={post.slug}
                onChange={(e) => setPostKey('slug', formatSlug(e.target.value))}
            />

            <p className="text-xs text-muted-foreground">
                URL-friendly version of your title. Only lowercase letters, numbers, and hyphens allowed.
            </p>
        </div>
    );
};
