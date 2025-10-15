import type { SVGAttributes } from 'react';

export const AppLogoIcon = (props: SVGAttributes<SVGElement>) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="32" height="32" rx="8" className="fill-primary" />
            <text
                x="16"
                y="21"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="14"
                fontWeight="700"
                textAnchor="middle"
                className="fill-primary-foreground"
            >
                BH
            </text>
        </svg>
    );
};
