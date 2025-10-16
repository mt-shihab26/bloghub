import type { Config } from 'ziggy-js';
import type { TImage, TUser } from './models';

export type TPublicPage<T extends object = object> = {
    name: string;
    auth: { user?: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;

export type TAuthPage<T extends object = object> = {
    name: string;
    auth: { user: TUser; image?: TImage };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;
