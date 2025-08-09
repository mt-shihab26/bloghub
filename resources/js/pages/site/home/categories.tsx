import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const Categories = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {[
                        { name: 'Web Development', count: 45, color: 'bg-blue-100 text-blue-800' },
                        { name: 'Mobile Development', count: 23, color: 'bg-green-100 text-green-800' },
                        { name: 'Data Science', count: 18, color: 'bg-purple-100 text-purple-800' },
                        { name: 'DevOps', count: 15, color: 'bg-orange-100 text-orange-800' },
                        { name: 'Design', count: 12, color: 'bg-pink-100 text-pink-800' },
                        { name: 'Career', count: 8, color: 'bg-yellow-100 text-yellow-800' },
                    ].map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted"
                        >
                            <span className="text-sm font-medium">{category.name}</span>
                            <Badge className={`text-xs ${category.color}`}>{category.count}</Badge>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
