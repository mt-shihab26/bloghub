import { SiteLayout } from '@/layouts/site-layout';
import { Header } from '@/components/screens/profile/write/header';
import { FeaturedImageUpload } from '@/components/screens/profile/write/featured-image-upload';
import { Writing } from '@/components/screens/profile/write/writing';
import { PublishingOptions } from '@/components/screens/profile/write/publishing-options';

const Write = () => {
    return (
        <SiteLayout title="Write">
            <Header />
            <div className="grid pt-5 pb-10 grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Writing />
                </div>
                <div className="space-y-6">
                    <FeaturedImageUpload />
                    <PublishingOptions />
                </div>
            </div>
        </SiteLayout>
    );
};

export default Write;
