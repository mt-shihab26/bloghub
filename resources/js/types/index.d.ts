import type { Config } from 'ziggy-js';
import type { TFile, TPost, TUser } from './models';

export type TPublicPage<T extends object = object> = {
    name: string;
    auth: { user?: TUser | null; image?: TFile | null; bookmarks?: Pick<TPost, 'id' | 'slug'>[] | null };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;

export type TAuthPage<T extends object = object> = {
    name: string;
    auth: { user: TUser; image?: TFile | null; bookmarks?: Pick<TPost, 'id' | 'slug'>[] | null };
    ziggy: Config & { location: string };
    sidebar: boolean;
} & T;
