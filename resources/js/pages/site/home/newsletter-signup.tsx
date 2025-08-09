import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const NewsletterSignup = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
                <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Input placeholder="Enter your email" type="email" />
                    <Button className="w-full">Subscribe</Button>
                </div>
            </CardContent>
        </Card>
    );
};
