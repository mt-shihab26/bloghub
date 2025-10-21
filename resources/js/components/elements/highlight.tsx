import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? [Key] | [Key, ...NestedKeyOf<ObjectType[Key]>]
        : [Key];
}[keyof ObjectType & (string | number)];

type FieldPath<T> = keyof T | string | (T extends object ? NestedKeyOf<T> : never);

const getNestedValue = <T,>(obj: any, path: FieldPath<T>): any => {
    if (typeof path === 'string') {
        return obj?.[path];
    }

    if (Array.isArray(path)) {
        return path.reduce((current, key) => current?.[key], obj);
    }

    return obj?.[path as keyof typeof obj];
};

export const Highlight = <T,>({
    hit,
    field,
    index,
    transformer,
    className,
}: {
    hit: THit<T>;
    field: FieldPath<T>;
    index?: number;
    transformer?: (value: any) => ReactNode;
    className?: string;
}) => {
    const fieldKey = Array.isArray(field) ? field.join('.') : field;
    const highlightValue = getNestedValue(hit?.highlight, fieldKey);

    const html = Array.isArray(highlightValue) ? highlightValue?.[index || 0]?.snippet : highlightValue?.snippet;

    if (!html) {
        const documentValue = getNestedValue(hit?.document, field);
        const text = Array.isArray(documentValue) ? documentValue?.[index || 0] : documentValue;

        return <>{transformer ? transformer(text) : text}</>;
    }

    return (
        <span
            className={cn('[&_mark]:bg-yellow-200 [&_mark]:text-foreground dark:[&_mark]:bg-yellow-500/40', className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
