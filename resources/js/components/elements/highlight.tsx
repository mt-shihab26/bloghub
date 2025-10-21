import type { THit } from '@/types/search';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FieldPath<T> = keyof T | string | string[];

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
    // Handle nested field access for highlights
    // For array fields with index (e.g., tags[0].name), the structure is:
    // highlight.tags[0].name.snippet (not highlight.tags.name[0].snippet)
    let highlightValue = getNestedValue(hit?.highlight, field);
    let html: string | undefined;

    if (index !== undefined && Array.isArray(highlightValue)) {
        // Case 1: highlight.field is an array - get the indexed item
        // e.g., highlight.tags[0].snippet
        html = highlightValue?.[index]?.snippet;
    } else if (index !== undefined && highlightValue && typeof highlightValue === 'object') {
        // Case 2: When field is array path like ['tags', 'name'], check if parent is array
        // Get parent field to check if it's an array
        const parentField = Array.isArray(field) ? field.slice(0, -1) : null;
        if (parentField && parentField.length > 0) {
            const parentValue = getNestedValue(hit?.highlight, parentField);
            if (Array.isArray(parentValue)) {
                // Access the indexed item from parent array, then get the nested field
                const lastKey = Array.isArray(field) ? field[field.length - 1] : null;
                if (lastKey) {
                    const indexedValue = parentValue[index]?.[lastKey];
                    html = indexedValue?.snippet;
                }
            }
        }
    } else {
        // Case 3: Simple field or no index - just get the snippet
        html = highlightValue?.snippet;
    }

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
