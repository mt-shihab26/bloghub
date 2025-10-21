import type { Config } from 'ziggy-js';
import type { TImage, TPost, TUser } from './models';

export type TPublicPage<T extends object = object> = {
    name: string;
    auth: { user?: TUser | null; image?: TImage | null; bookmarks?: Pick<TPost, 'id' | 'slug'>[] | null };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;

export type TAuthPage<T extends object = object> = {
    name: string;
    auth: { user: TUser; image?: TImage | null; bookmarks?: Pick<TPost, 'id' | 'slug'>[] | null };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;
