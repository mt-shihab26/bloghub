import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? [Key] | [Key, ...NestedKeyOf<ObjectType[Key]>]
        : [Key];
}[keyof ObjectType & (string | number)];

type FieldPath<T> = keyof T | string | (T extends object ? NestedKeyOf<T> : never);

type GetFieldValue<T, Path> = Path extends keyof T
    ? T[Path]
    : Path extends [infer First, ...infer Rest]
      ? First extends keyof T
          ? Rest extends []
              ? T[First]
              : GetFieldValue<T[First], Rest>
          : unknown
      : Path extends string
        ? Path extends `${infer First}.${infer Rest}`
            ? First extends keyof T
                ? GetFieldValue<T[First], Rest>
                : unknown
            : Path extends keyof T
              ? T[Path]
              : unknown
        : unknown;

const getNestedValue = (obj: any, path: string | string[] | number | symbol): any => {
    if (typeof path === 'string' || typeof path === 'number' || typeof path === 'symbol') {
        return obj?.[path];
    }

    if (Array.isArray(path)) {
        return path.reduce((current, key) => current?.[key], obj);
    }

    return undefined;
};

export const Highlight = <T, F extends FieldPath<T>>({
    hit,
    field,
    index,
    transformer,
    className,
}: {
    hit: THit<T>;
    field: F;
    index?: number;
    transformer?: (value: GetFieldValue<T, F> | undefined) => ReactNode;
    className?: string;
}) => {
    const highlightValue = getNestedValue(hit?.highlight, field);
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
