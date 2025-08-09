import { trendingTopics } from './data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export const TrendingTopics = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {trendingTopics.map((topic) => (
                        <Button key={topic} variant="ghost" className="w-full justify-start text-sm" asChild>
                            <Link href={`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`}>{topic}</Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
