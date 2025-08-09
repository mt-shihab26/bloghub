import { recommendedBlogs } from './data';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const PopularAuthors = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Popular Authors</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recommendedBlogs.slice(0, 3).map((blog) => (
                        <div key={blog.author.username} className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={blog.author.avatar || '/placeholder.svg'} />
                                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Link href={`/author/${blog.author.username}`} className="font-medium hover:underline">
                                    {blog.author.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">@{blog.author.username}</p>
                            </div>
                            <Button size="sm" variant="outline">
                                Follow
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
