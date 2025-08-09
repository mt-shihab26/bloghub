import type { Config } from 'ziggy-js';
import type { TImage, TUser } from './models';

export type TPublicPage = {
    name: string;
    quote: { message: string; author: string };
    auth: { user?: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};

export type TAuthPage = {
    name: string;
    quote: { message: string; author: string };
    auth: { user: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
};
