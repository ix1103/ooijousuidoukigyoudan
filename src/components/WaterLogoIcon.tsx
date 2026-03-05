import React from 'react';

export const WaterLogoIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* 外側の円 */}
            <circle cx="50" cy="50" r="28" strokeWidth="8" />

            {/* 内側の4つの頂点を持つ曲線（星・きらめき） */}
            <path
                d="M 50,6 Q 50,50 94,50 Q 50,50 50,94 Q 50,50 6,50 Q 50,50 50,6 Z"
                strokeWidth="8"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
};
