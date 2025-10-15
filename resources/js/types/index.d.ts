import type { Config } from 'ziggy-js';
import type { TImage, TUser } from './models';

export type TPublicPage<T extends object = object> = {
    name: string;
    quote: { message: string; author: string };
    auth: { user?: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
} & T;

export type TAuthPage<T extends object = object> = {
    name: string;
    quote: { message: string; author: string };
    auth: { user: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
} & T;
