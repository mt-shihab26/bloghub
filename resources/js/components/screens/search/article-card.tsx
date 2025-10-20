import type { THit, TSearchPost } from '@/types/search';

import { formatHumanDate, formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, categoryLink, categoryName, imageLink, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { BookmarkButton } from '@/components/composite/bookmark-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

export const ArticleCard = ({ ith, post }: { ith: number; post: THit<TSearchPost> }) => {
    const doc = post.document;
    const highlights = post.highlights || [];

    const getHighlight = (field: string) => {
        const highlight = highlights.find((h) => h.field === field);
        return highlight?.snippet;
    };

    const titleHighlight = getHighlight('title');
    const excerptHighlight = getHighlight('excerpt');
    const contentHighlight = getHighlight('content');

    const user = {
        id: doc['user.id'],
        username: doc['user.username'],
        name: doc['user.name'],
        image: doc['user.image.name'] ? { name: doc['user.image.name'] } : null,
    };

    const category = {
        id: doc['category.id'],
        slug: doc['category.slug'],
        name: doc['category.name'],
    };

    const tags = doc['tags.id']?.map((_, index) => ({
        id: doc['tags.id'][index],
        slug: doc['tags.slug'][index],
        name: doc['tags.name'][index],
    }));

    return (
        <div key={doc.id} className="flex space-x-2 overflow-hidden rounded-lg border p-4">
            <div>
                <Avatar className="size-11">
                    <AvatarImage src={imageLink(doc['user.image.name'])} />
                    <AvatarFallback>{formatInitials(doc['user.name'])}</AvatarFallback>
                </Avatar>
            </div>
            <div className="w-full space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                            <Link href={authorLink(user)} className="text-sm font-medium hover:underline">
                                {user.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                {formatHumanDate(doc.published_at)} ({formatTimeAgo(doc.published_at)})
                            </span>
                        </div>
                    </div>
                    <div className="p-2.5">
                        <Badge className="rounded-full" variant="outline">
                            {ith}
                        </Badge>
                    </div>
                </div>
                <h2 className="text-xl font-semibold">
                    <Link href={postLink(user, { slug: doc.slug })} className="hover:underline">
                        {titleHighlight ? <span dangerouslySetInnerHTML={{ __html: titleHighlight }} /> : doc.title}
                    </Link>
                </h2>
                <p className="text-muted-foreground">
                    {excerptHighlight ? (
                        <span dangerouslySetInnerHTML={{ __html: excerptHighlight }} />
                    ) : contentHighlight ? (
                        <span dangerouslySetInnerHTML={{ __html: contentHighlight }} />
                    ) : (
                        doc.excerpt
                    )}
                </p>
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-wrap items-center space-x-2">
                        {category && (
                            <Link href={categoryLink(category)}>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                >
                                    {categoryName(category)}
                                </Badge>
                            </Link>
                        )}
                        {tags?.map((tag) => (
                            <Link key={tag.slug} href={tagLink(tag)}>
                                <Badge variant="secondary" className="cursor-pointer text-xs hover:underline">
                                    #{tag.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center space-x-2">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{readingTime(doc.content)} min read</span>
                        </div>
                        <BookmarkButton post={doc} />
                    </div>
                </div>
            </div>
        </div>
    );
};
