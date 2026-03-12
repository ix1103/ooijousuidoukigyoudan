"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden bg-primary-main/5 rounded-md",
                "before:absolute before:inset-0 before:animate-shimmer before:content-['']",
                className
            )}
            {...props}
        />
    );
};
