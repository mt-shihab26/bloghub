import { SiteLayout } from '@/layouts/site-layout';
import { Header } from '@/components/screens/profile/write/header';
import { FeaturedImageUpload } from '@/components/screens/profile/write/featured-image-upload';
import { Writing } from '@/components/screens/profile/write/writing';
import { PublishingOptions } from '@/components/screens/profile/write/publishing-options';

const Write = () => {
    return (
        <SiteLayout title="Write">
            <Header />
            <div className="pt-5 pb-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FeaturedImageUpload />
                    <PublishingOptions />
                </div>
                <Writing />
            </div>
        </SiteLayout>
    );
};

export default Write;
