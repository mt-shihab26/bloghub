import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TFieldPath<T> = keyof T | string | string[];

type TGetFieldValue<T, Path> = Path extends keyof T
    ? T[Path]
    : Path extends [infer First, ...infer Rest]
      ? First extends keyof T
          ? Rest extends []
              ? T[First]
              : TGetFieldValue<T[First], Rest>
          : unknown
      : Path extends string
        ? Path extends `${infer First}.${infer Rest}`
            ? First extends keyof T
                ? TGetFieldValue<T[First], Rest>
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

const getHighlightSnippet = (
    highlight: any,
    field: string | string[] | number | symbol,
    index?: number,
): string | undefined => {
    if (!highlight) {
        return undefined;
    }

    // Get the nested highlight value
    const highlightValue = getNestedValue(highlight, field);

    // If we have an index, we're dealing with array fields
    if (index !== undefined) {
        // Check if the highlightValue is directly an array (e.g., highlight.tags[index])
        if (Array.isArray(highlightValue)) {
            return highlightValue[index]?.snippet;
        }

        // For nested paths like ['tags', 'name'], the parent might be an array
        if (Array.isArray(field) && field.length > 1) {
            const parentField = field.slice(0, -1);
            const lastKey = field[field.length - 1];
            const parentValue = getNestedValue(highlight, parentField);

            if (Array.isArray(parentValue)) {
                return parentValue[index]?.[lastKey]?.snippet;
            }
        }
    }

    // No index or single field - just get the snippet
    return highlightValue?.snippet;
};

export const Highlight = <T, F extends TFieldPath<T>>({
    hit,
    field,
    index,
    transformer,
    className,
}: {
    hit: THit<T>;
    field: F;
    index?: number;
    transformer?: (value: TGetFieldValue<T, F> | undefined) => ReactNode;
    className?: string;
}) => {
    const html = getHighlightSnippet(hit?.highlight, field, index);

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
