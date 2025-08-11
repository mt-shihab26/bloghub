import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsletterSignup = () => {
    const form = useForm({
        email: '',
    });

    const submit = () => {
        form.post(route('site.newsletter.subscribe'), {
            onSuccess: () => {
                form.reset('email');
            },
        });
    };

    return (
        <div className="overflow-hidden rounded-lg border p-5">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Stay Updated</h2>
                <p className="text-muted-foreground">Get the latest articles delivered to your inbox</p>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                className="space-y-2"
            >
                <Input placeholder="Enter your email" type="email" />
                <Button className="w-full">Subscribe</Button>
            </form>
        </div>
    );
};
