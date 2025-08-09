import type { Config } from 'ziggy-js';
import type { TUser } from './models';

export type TPublicPage = {
    name: string;
    quote: { message: string; author: string };
    auth: { user?: TUser };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};

export type TAuthPage = {
    name: string;
    quote: { message: string; author: string };
    auth: { user: TUser };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};
