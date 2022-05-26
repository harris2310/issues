import styled from 'styled-components';

import { cardBorderColor } from '../design/@generated/themes';

export const PageSep = styled.div`
    border-top: 1px solid ${cardBorderColor};
    margin: 40px -20px; /* Page component padding */
`;
