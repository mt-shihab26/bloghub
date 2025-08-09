import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const PopularTags = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {[
                        'React',
                        'JavaScript',
                        'TypeScript',
                        'Next.js',
                        'Node.js',
                        'Python',
                        'CSS',
                        'HTML',
                        'Database',
                        'API',
                        'Tutorial',
                        'Best Practices',
                    ].map((tag) => (
                        <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                            <Badge
                                variant="outline"
                                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                            >
                                #{tag}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
