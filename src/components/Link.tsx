import React from 'react';
import styled, { css } from 'styled-components';

import { linkTextColor } from '../design/@generated/themes';

interface LinkProps extends React.HTMLProps<HTMLLinkElement> {
    inline?: boolean;
}

const StyledLink = styled(({ forwardRef, inline, ...props }) => <a ref={forwardRef} {...props} />)`
    color: ${linkTextColor};
    transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    &:hover,
    &:focus {
        transition-duration: 0.1s;
    }

    ${({ inline }) =>
        inline &&
        css`
            color: inherit;

            &:hover {
                color: ${linkTextColor};
            }
        `}
`;

export const Link = React.forwardRef<HTMLLinkElement, LinkProps>(({ as, ...props }, ref) => {
    return <StyledLink {...props} forwardRef={ref} />;
});
