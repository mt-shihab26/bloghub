import { SiteLayout } from '@/layouts/site-layout';
import { Header } from '@/components/screens/profile/write/header';
import { Title } from '@/components/screens/profile/write/title';
import { Content } from '@/components/screens/profile/write/content';
import { Excerpt } from '@/components/screens/profile/write/excerpt';
import { FeaturedImage } from '@/components/screens/profile/write/featured-image';
import { Category } from '@/components/screens/profile/write/category';
import { Tags } from '@/components/screens/profile/write/tags';
import { Slug } from '@/components/screens/profile/write/slug';

const Write = () => {
    return (
        <SiteLayout title="Write" footer={false}>
            <Header />
            <div className=" px-4 py-8 space-y-8">
                <Content />
                <Title />
                <Excerpt />
                <FeaturedImage />
                <Category />
                <Tags />
                <Slug />
            </div>
        </SiteLayout>
    );
};

export default Write;
