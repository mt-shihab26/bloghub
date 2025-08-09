export type TNavItem = {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
};

export type TBreadcrumbItem = {
    title: string;
    href: string;
};
