import type { Config } from 'ziggy-js';

export type TAuthPage = {
    name: string;
    quote: { message: string; author: string };
    auth: { user: TUser };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};
