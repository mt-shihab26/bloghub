import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import type { ReactNode } from 'react';

import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

export const DeleteConfirm = ({
    route,
    title = 'Delete Item',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    trigger,
    onSuccess,
    onError,
    options = {},
}: {
    route: string;
    title?: string;
    description?: string;
    trigger?: ReactNode;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    options?: any;
}) => {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        router.delete(route, {
            preserveScroll: true,
            ...options,
            onSuccess: () => {
                setOpen(false);
                setIsDeleting(false);
                onSuccess?.();
            },
            onError: (error) => {
                setIsDeleting(false);
                onError?.(error);
            },
        });
    };

    const defaultTrigger = (
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2Icon className="h-4 w-4" />
        </Button>
    );

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{trigger || defaultTrigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
