import { SiteLayout } from '@/layouts/site-layout';
import { Header } from '@/components/screens/profile/write/header';
import { Title } from '@/components/screens/profile/write/title';
import { Content } from '@/components/screens/profile/write/content';
import { Excerpt } from '@/components/screens/profile/write/excerpt';

const Write = () => {
    return (
        <SiteLayout title="Write" footer={false}>
            <Header />
            <div className="py-10 space-y-8">
                <Content />
                <Title />
                <Excerpt />
            </div>
        </SiteLayout>
    );
};

export default Write;
