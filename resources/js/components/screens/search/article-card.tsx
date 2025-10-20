import type { THit, TSearchPost } from '@/types/search';

import { formatHumanDate, formatInitials, formatTimeAgo } from '@/lib/format';
import { authorLink, categoryLink, categoryName, imageLink, postLink, tagLink } from '@/lib/links';
import { readingTime } from '@/lib/utils';

import { BookmarkButton } from '@/components/composite/bookmark-button';
import { Highlight } from '@/components/elements/highlight';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';

export const ArticleCard = ({ ith, post }: { ith: number; post: THit<TSearchPost> }) => {
    const doc = post.document;
    const highlight = post.highlight;

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
                            <Link
                                href={authorLink({ username: doc['user.username'] })}
                                className="text-sm font-medium hover:underline"
                            >
                                <Highlight hit={post} key="user.username" />
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                {formatHumanDate(doc['published_at'])} ({formatTimeAgo(doc['published_at'])})
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
                    <Link
                        href={postLink({ username: doc['user.username'] }, { slug: doc['slug'] })}
                        className="hover:underline"
                    >
                        <Highlight html={highlight?.['title']?.snippet} fallback={doc['title']} />
                    </Link>
                </h2>
                <p className="text-muted-foreground">
                    <Highlight html={highlight?.['excerpt']?.snippet} fallback={doc.excerpt} />
                </p>
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-wrap items-center space-x-2">
                        {doc['category.slug'] && doc['category.name'] && (
                            <Link href={categoryLink({ slug: doc['category.slug'] })}>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Highlight
                                        html={highlight?.['category.name'].snippet}
                                        fallback={categoryName({ name: doc['category.name'] })}
                                    />
                                </Badge>
                            </Link>
                        )}
                        {doc['tags.slug']?.map((slug, index) => (
                            <Link key={slug} href={tagLink({ slug })}>
                                <Badge variant="secondary" className="cursor-pointer text-xs hover:underline">
                                    #{/* <Highlight */}
                                    {/*     html={highlight?.['category.name'].snippet} */}
                                    {/*     fallback={categoryName({ name: doc['category.name'] })} */}
                                    {/* /> */}
                                    {doc['tags.name'][index]}
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
