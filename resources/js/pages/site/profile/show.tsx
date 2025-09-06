import type { TShowUser } from '@/types/profile';

import { SiteLayout } from '@/layouts/site-layout';
import { Header } from '@/components/screens/profile/show/header';
import { LatestPosts } from '@/components/screens/profile/show/latest-posts';

const Show = ({ user }: { user: TShowUser }) => {
    return (
        <SiteLayout title={user.name}>
            <div className="container mx-auto space-y-8 max-w-6xl px-4 py-8">
                <Header user={user} />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <LatestPosts user={user} />
                    <div className="space-y-8">
                        {/* Activity Section */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="mb-4 text-xl font-bold">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm">
                                            Published "The Future of Web Development: What's Coming
                                            in 2024"
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            2 hours ago
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm">
                                            Liked "Understanding Database Design Patterns" by David
                                            Kim
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            1 day ago
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm">Started following Mike Johnson</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            2 days ago
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm">
                                            Published "Building Responsive Layouts with CSS Grid"
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            3 days ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
};

export default Show;
