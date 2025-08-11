import { useForm } from '@inertiajs/react';

import { InputError } from '@/components/elements/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const AddComment = () => {
    const { data, setData, errors, post } = useForm<{
        content: string;
    }>({
        content: '',
    });

    return (
        <Card>
            <CardContent className="pt-6">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post('site.users.store');
                    }}
                    className="space-y-4"
                >
                    <Textarea
                        placeholder="Share your thoughts..."
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="min-h-[100px]"
                    />
                    <InputError message={errors.content} />
                    <div className="flex justify-end">
                        <Button>Post Comment</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
