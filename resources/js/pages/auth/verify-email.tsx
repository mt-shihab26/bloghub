import { useForm } from '@inertiajs/react';

import { TextLink } from '@/components/elements/text-link';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const VerifyEmail = ({ status }: { status?: string }) => {
    const { post, processing } = useForm({});

    return (
        <AuthLayout
            title="Verify email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    post(route('verification.send'));
                }}
                className="space-y-6 text-center"
            >
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
};

export default VerifyEmail;
